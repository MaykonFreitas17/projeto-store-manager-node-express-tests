const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');

const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const product = { id: 1, name: 'Martelo de Thor' };

describe('Ao chamar as funções do ProductsController', () => {
  describe('Ao chamar a função getAll', () => {
    before(async () => {
      sinon.stub(ProductsService, 'getAll').resolves(products);
    });

    after(async () => { ProductsService.getAll.restore(); });

    it('Retorna um status com 200', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await ProductsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    })

    it('Retorna um json com os objetos dos produtos', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await ProductsController.getAll(req, res);

      expect(res.json.calledWith(products)).to.be.true;
    })
  });

  describe('Ao chamar a função getById', () => {
    describe('Ao Buscando por um produto existente', () => {
      before(async () => {
        sinon.stub(ProductsService, 'getById').resolves(product);
      });

      after(async () => { ProductsService.getById.restore(); });

      it('Retorna um status com 200', async () => {
        const req = {};
        const res = {};
        req.params = sinon.stub().returns(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await ProductsController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      })

      it('Retorna um json com os objetos dos produtos', async () => {
        const req = {};
        const res = {};

        req.params = sinon.stub().returns(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await ProductsController.getById(req, res);

        expect(res.json.calledWith(product)).to.be.true;
      })
    });

    describe('Ao Buscando por um produto não existente', () => {
      before(async () => {
        sinon.stub(ProductsService, 'getById').resolves(false);
      });

      after(async () => { ProductsService.getById.restore(); });

      it('Retorna um status com 404', async () => {
        const req = {};
        const res = {};
        req.params = sinon.stub().returns(4);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await ProductsController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      })

      it('Retorna um json com uma mensgem de erro "Product not found"', async () => {
        const req = {};
        const res = {};

        req.params = sinon.stub().returns(1);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await ProductsController.getById(req, res);
        const error = {
          message: "Product not found",
        }
        expect(res.json.calledWith(error)).to.be.true;
      })
    });
  });

  describe('Ao chamar a função create', () => {
    describe('Produto cadastrado com sucesso', () => {
      const res = {};
      const req = {};

      before(async () => {
        req.body = {
          name: 'Armadura do Homem de Ferro'
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'create')
          .resolves({ id: 4, name: 'Armadura do Homem de Ferro' });
      })

      after(async () => {
        ProductsService.create.restore();
      });

      it('Retornar um status 201', async () => {
        await ProductsController.create(req, res);
        expect(res.status.calledWith(201)).to.be.true;
      });

      it('Retornar um json com o produto cadastro', async () => {
        await ProductsController.create(req, res);
        expect(res.json.calledWith({ id: 4, name: 'Armadura do Homem de Ferro' })).to.be.true;
      });
    });

    describe('Produto não é cadastrado com sucesso - nome inválido', () => {
      const res = {};
      const req = {};

      before(async () => {
        req.body = sinon.stub().returns('');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'create').resolves(false);
      })

      after(async () => { ProductsService.create.restore() });

      it('Retornar um status 400', async () => {
        await ProductsController.create(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Retornar um json com objeto com a propriedade MESSAGE', async () => {
        await ProductsController.create(req, res);
        expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
      });
    });

    // describe('Produto não é cadastrado com sucesso - nome com menos de 5 caracteres', () => {
    //   it('Retornar um status 422', async () => {
    //     const req = {};
    //     const res = {};
    //     await ProductsController.create(req, res);
    //     expect(res.status.calledWith(422)).to.be.true;
    //   });

    //   it('Retornar um json com objeto com a propriedade MESSAGE', async () => {
    //     const req = {};
    //     const res = {};
    //     await ProductsController.create(req, res);
    //     expect(res.json).to.have.property('message');
    //   });

    //   it('Retornar um json com a mensagem "name length must be at least 5 characters long"', async () => {
    //     const req = {};
    //     const res = {};
    //     await ProductsController.create(req, res);
    //     expect(res.json.message).to.be.equal('name length must be at least 5 characters long');
    //   });
    // });
  });
});