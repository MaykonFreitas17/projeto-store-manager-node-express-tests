const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesProductsModel = require('../../../models/SalesProductsModel');

describe('Ao Cadastrar uma nova vendas_produtos(Sales_Products) - SalesProductsModel', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um objeto', async () => {
    const salesID = 1;
    const productID = 1;
    const quantity = 10;
    const response = await SalesProductsModel.create(salesID, productID, quantity);
    expect(response).to.be.a('object');
  });

  it('Retorna um objeto com a propriedade insertId', async () => {
    const salesID = 1;
    const productID = 1;
    const quantity = 10;
    const response = await SalesProductsModel.create(salesID, productID, quantity);
    expect(response).to.be.a('object');
  });
});