const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');

describe('Ao listar todas as vendas - SalesController', () => {
  const req = {};
  const res = {};

  const sales = [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2
    },
    {
      saleId: 1,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2
    }
  ];

  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(SalesService, 'getAll').resolves(sales);
  })

  after(async () => {
    SalesService.getAll.restore();
  });

  it('Retornar um status 200', async () => {
    await SalesController.getAll(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('Retornar um json com uma lista de todas as vendas', async () => {
    await SalesController.getAll(req, res);
    expect(res.json.calledWith(sales)).to.be.true;
  });
});

describe('Ao listar uma venda pelo o seu "ID" - SalesController', () => {
  describe('Ao listar uma venda com SUCESSO', () => {
    const req = {};
    const res = {};

    const sales = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ];

    before(async () => {
      req.params = sinon.stub().returns(1);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getById').resolves(sales);
    })

    after(async () => {
      SalesService.getById.restore();
    });

    it('Retornar um status 200', async () => {
      await SalesController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Retornar um json com uma lista de vendas relacionada a venda pesquisada', async () => {
      await SalesController.getById(req, res);
      expect(res.json.calledWith(sales)).to.be.true;
    });
  });
  describe('Ao tentar listar uma venda inexistente', () => {
    const req = {};
    const res = {};

    const error = { message: 'Sale not found' };

    before(async () => {
      req.params = sinon.stub().returns(5);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getById').resolves({
        code: 404,
        message: error,
      });
    })

    after(async () => {
      SalesService.getById.restore();
    });

    it('Retornar um status 404', async () => {
      await SalesController.getById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Retornar um json com uma lista de vendas relacionada a venda pesquisada', async () => {
      await SalesController.getById(req, res);
      expect(res.json.calledWith({ message: error })).to.be.true;
    });
  });
});