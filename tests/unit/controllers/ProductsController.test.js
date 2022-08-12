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
});