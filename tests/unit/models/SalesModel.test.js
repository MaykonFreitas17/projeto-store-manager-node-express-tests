const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

describe('Ao Cadastrar uma nova venda(Sale) - SalesModel', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um objeto', async () => {
    const response = await SalesModel.create();
    expect(response).to.be.a('object');
  });

  it('Retorna um objeto com a propriedade insertId', async () => {
    const response = await SalesModel.create();
    expect(response).to.be.a('object');
  });
});

describe('Ao Listar todas as vendas - SalesModel', () => {
  const sales = [
    [
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
    ]
  ];

  before(async () => {
    sinon.stub(connection, 'execute').resolves(sales);
  });

  after(async () => { 
    connection.execute.restore();
  });

  it('Retorna uma lista com as vendas', async () => {
    const response = await SalesModel.getAll();
    expect(response).to.be.a('array');
  });

  it('Retorna um lista com vendas com a propriedade "saleId"', async () => {
    const response = await SalesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('saleId'));
  });

  it('Retorna um lista com vendas com a propriedade "date"', async () => {
    const response = await SalesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('date'));
  });

  it('Retorna um lista com vendas com a propriedade "productId"', async () => {
    const response = await SalesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('productId'));
  });

  it('Retorna um lista com vendas com a propriedade "quantity"', async () => {
    const response = await SalesModel.getAll();
    response.forEach((sale) => expect(sale).to.have.property('quantity'));
  });
});

describe('Ao Listar um venda pelo seu "ID" - SalesModel', () => {
  describe('Ao Listar uma venda com SUCESSO', () => {
    const sales = [
      [
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
      ]
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(sales);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna uma lista com as vendas', async () => {
      const response = await SalesModel.getById();
      expect(response).to.be.a('array');
    });

    it('Retorna um lista com vendas com a propriedade "saleId"', async () => {
      const response = await SalesModel.getById();
      response.forEach((sale) => expect(sale).to.have.property('saleId'));
    });

    it('Retorna um lista com vendas com a propriedade "date"', async () => {
      const response = await SalesModel.getById();
      response.forEach((sale) => expect(sale).to.have.property('date'));
    });

    it('Retorna um lista com vendas com a propriedade "productId"', async () => {
      const response = await SalesModel.getById();
      response.forEach((sale) => expect(sale).to.have.property('productId'));
    });

    it('Retorna um lista com vendas com a propriedade "quantity"', async () => {
      const response = await SalesModel.getById();
      response.forEach((sale) => expect(sale).to.have.property('quantity'));
    });
  });
});