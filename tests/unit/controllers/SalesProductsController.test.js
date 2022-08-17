const sinon = require('sinon');
const { expect } = require('chai');

const SalesProductsService = require('../../../services/SalesProductsService');
const SalesProductsController = require('../../../controllers/SalesProductsController');

describe('Ao chamar a função create - SalesProductsController', () => {
  describe('Produto cadastrado com sucesso', () => {
    const res = {};
    const req = {};

    before(async () => {
      req.body = [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 }
      ];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesProductsService, 'create')
        .resolves({
          id: 3,
          itemsSold: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 5 },
          ]
        });
    })

    after(async () => {
      SalesProductsService.create.restore();
    });

    it('Retornar um status 201', async () => {
      await SalesProductsController.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it('Retornar um json com o "ID" da venda e uma lista "itemsSold" com os produtos vendidos', async () => {
      await SalesProductsController.create(req, res);
      const resultJSON = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ]
      };
      expect(res.json.calledWith(resultJSON)).to.be.true;
    });
  });

  describe('Produto cadastrado sem sucesso - sem o campo "productId" ', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [
        { quantity: 1 },
        { productId: 2, quantity: 5 }
      ];

      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesProductsService, 'create')
        .resolves({
          code: 400,
          message: '"productId" is required',
        });
    })

    after(async () => {
      SalesProductsService.create.restore();
    });

    it('Retornar um status 400', async () => {
      await SalesProductsController.create(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Retornar um json com o "MESSAGE" "productId is required"', async () => {
      await SalesProductsController.create(req, res);
      const resultJSON = { message: '"productId" is required' };
      expect(res.json.calledWith(resultJSON)).to.be.true;
    });
  });

  describe('Produto cadastrado sem sucesso - sem o campo "quantity" ', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [
        { productId: 1 },
        { productId: 2, quantity: 5 }
      ];

      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesProductsService, 'create')
        .resolves({
          code: 400,
          message: '"quantity" is required',
        });
    })

    after(async () => {
      SalesProductsService.create.restore();
    });

    it('Retornar um status 400', async () => {
      await SalesProductsController.create(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Retornar um json com o "MESSAGE" "quantity is required"', async () => {
      await SalesProductsController.create(req, res);
      const resultJSON = { message: '"quantity" is required' };
      expect(res.json.calledWith(resultJSON)).to.be.true;
    });
  });

  describe('Produto cadastrado sem sucesso - com o "quantity" menor ou igual a 0(zero)', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [
        { productId: 1, quantity: 0 },
        { productId: 2, quantity: 5 }
      ];

      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesProductsService, 'create')
        .resolves({
          code: 422,
          message: '"quantity" must be greater than or equal to 1',
        });
    })

    after(async () => {
      SalesProductsService.create.restore();
    });

    it('Retornar um status 422', async () => {
      await SalesProductsController.create(req, res);
      expect(res.status.calledWith(422)).to.be.true;
    });

    it('Retornar um json com o "MESSAGE" "quantity is required"', async () => {
      await SalesProductsController.create(req, res);
      const resultJSON = { message: '"quantity" must be greater than or equal to 1' };
      expect(res.json.calledWith(resultJSON)).to.be.true;
    });
  });

  describe('Produto cadastrado sem sucesso - com o Produto inexistente', () => {
    const res = {};
    const req = {};

    before(async () => {
      const body = [
        { productId: 5, quantity: 0 },
        { productId: 2, quantity: 5 },
      ];

      req.body = sinon.stub().returns(body);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesProductsService, 'create')
        .resolves({
          code: 404,
          message: '"Product" not found',
        });
    })

    after(async () => {
      SalesProductsService.create.restore();
    });

    it('Retornar um status 404', async () => {
      await SalesProductsController.create(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Retornar um json com o "MESSAGE" "Product not found"', async () => {
      await SalesProductsController.create(req, res);
      const resultJSON = { message: '"Product" not found' };
      expect(res.json.calledWith(resultJSON)).to.be.true;
    });
  });
});
