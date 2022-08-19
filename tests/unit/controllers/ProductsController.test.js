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

        sinon.stub(ProductsService, 'create')
          .resolves({ code: 400, message: '"name" is required' });
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

    describe('Produto não é cadastrado com sucesso - nome não é definido', () => {
      const res = {};
      const req = {};

      const message = '"name" length must be at least 5 characters long';

      before(async () => {
        req.body = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'create')
          .resolves({ code: 422, message });
      })

      after(async () => { ProductsService.create.restore() });

      it('Retornar um status 422', async () => {
        await ProductsController.create(req, res);
        expect(res.status.calledWith(422)).to.be.true;
      });

      it('Retornar um json com objeto com a propriedade MESSAGE', async () => {
        await ProductsController.create(req, res);
        expect(res.json.calledWith({ message })).to.be.true;
      });
    });
  });

  describe('Ao chamar a função update', () => {
    describe('Produto atualizado com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(1)
        req.body = sinon.stub().returns('Martelo do Batman');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'update').resolves({ id: 1, name: 'Martelo do Batman' });
      })

      after(async () => {
        ProductsService.update.restore();
      });

      it('Retorna um status com o valor de 200', async () => {
        await ProductsController.update(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
      it('Retorna um json com o produto atualizado', async () => {
        await ProductsController.update(req, res);
        const product = { id: 1, name: 'Martelo do Batman' }
        expect(res.json.calledWith(product)).to.be.true;
      });
    });

    describe('Produto não atualizado com sucesso - Produto não encontrado', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns('Martelo do Batman');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'update').resolves({
          code: 404,
          message: 'Product not found',
        });
      })

      after(async () => {
        ProductsService.update.restore();
      });

      it('Retorna um status com o valor de 404', async () => {
        await ProductsController.update(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      });
      it('Retorna um json com o propriedade message com o erro "Product not found"', async () => {
        await ProductsController.update(req, res);
        const error = { message: 'Product not found' };
        expect(res.json.calledWith(error)).to.be.true;
      });
    });

    describe('Produto não atualizado com sucesso - Nome Não definido', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'update').resolves({
          code: 400,
          message: '"name" is required',
        });
      })

      after(async () => {
        ProductsService.update.restore();
      });

      it('Retorna um status com o valor de 400', async () => {
        await ProductsController.update(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });
      it('Retorna um json com o propriedade message com o erro "name is required"', async () => {
        await ProductsController.update(req, res);
        const error = { message: '"name" is required' };
        expect(res.json.calledWith(error)).to.be.true;
      });
    });

    describe('Produto não atualizado com sucesso - Nome com string vazia', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns('');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'update').resolves({
          code: 400,
          message: '"name" is required',
        });
      })

      after(async () => {
        ProductsService.update.restore();
      });

      it('Retorna um status com o valor de 400', async () => {
        await ProductsController.update(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });
      it('Retorna um json com o propriedade message com o erro "name is required"', async () => {
        await ProductsController.update(req, res);
        const error = { message: '"name" is required' };
        expect(res.json.calledWith(error)).to.be.true;
      });
    });

    describe('Produto não atualizado com sucesso - Nome menor que 5 caracteres', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        req.body = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'update').resolves({
          code: 422,
          message: '"name" length must be at least 5 characters long',
        });
      })

      after(async () => {
        ProductsService.update.restore();
      });

      it('Retorna um status com o valor de 422', async () => {
        await ProductsController.update(req, res);
        expect(res.status.calledWith(422)).to.be.true;
      });
      it('Retorna um json com o propriedade message com o erro "name length must be at least 5 characters long"', async () => {
        await ProductsController.update(req, res);
        const error = { message: '"name" length must be at least 5 characters long' };
        expect(res.json.calledWith(error)).to.be.true;
      });
    });
  });

  describe('Ao chamar a função exclude', () => {
    describe('Produto excluido com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(1)
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();

        sinon.stub(ProductsService, 'exclude').resolves(true);
      })

      after(async () => {
        ProductsService.exclude.restore();
      });

      it('Retorna um status com valor 204', async () => {
        await ProductsController.exclude(req, res);
        expect(res.status.calledWith(204)).to.be.true;
      });
      it('A função end é chamada', async () => {
        await ProductsController.exclude(req, res);
        expect(res.end.called).to.be.true;
      });
    });

    describe('Produto não excluido com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.params = sinon.stub().returns(5)
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'exclude').resolves({
          code: 404,
          message: 'Product not found',
        });
      })

      after(async () => {
        ProductsService.exclude.restore();
      });

      it('Retorna um status com valor 404', async () => {
        await ProductsController.exclude(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      });
      it('Retorna um json com a mensagem de erro "Product not found"', async () => {
        await ProductsController.exclude(req, res);
        expect(res.json.calledWith({ message: 'Product not found'})).to.be.true;
      });
    });
  });

  describe('Ao chamar a função getByName', () => {
    describe('Busca feita com sucesso', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.query = sinon.stub().returns('Martelo');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'getByName').resolves([{
          id: 1,
          name: 'Martelo de Thor',
        }]);
      })

      after(async () => {
        ProductsService.getByName.restore();
      });

      it('Retorna um status com valor 200', async () => {
        await ProductsController.getByName(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
      it('A retorna um json com uma lista de produto(s)', async () => {
        await ProductsController.getByName(req, res);
        const response = [{
          id: 1,
          name: 'Martelo de Thor',
        }]
        expect(res.json.calledWith(response)).to.be.true;
      });
    });

    describe('Busca feita sem sucesso - Nenhum produto encontrado', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.query = sinon.stub().returns('Espada');
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'getByName').resolves([]);
      })

      after(async () => {
        ProductsService.getByName.restore();
      });

      it('Retorna um status com valor 200', async () => {
        await ProductsController.getByName(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
      it('A retorna um json com uma lista vázia', async () => {
        await ProductsController.getByName(req, res);
        const response = [];
        expect(res.json.calledWith(response)).to.be.true;
      });
    });

    describe('Busca feita sem sucesso - Nenhuma busca foi definida', () => {
      const req = {};
      const res = {};

      before(async () => {
        req.query = sinon.stub().returns();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductsService, 'getByName').resolves(products);
      })

      after(async () => {
        ProductsService.getByName.restore();
      });

      it('Retorna um status com valor 200', async () => {
        await ProductsController.getByName(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
      it('A retorna um json com uma lista com todos os produtos cadastros', async () => {
        await ProductsController.getByName(req, res);
        expect(res.json.calledWith(products)).to.be.true;
      });
    });
  });
});