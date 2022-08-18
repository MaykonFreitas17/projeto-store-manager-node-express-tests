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

describe('Ao deletar uma venda_produto - SalesProductsModel', () => {
  before(async () => {
    const result = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }]
    sinon.stub(connection, 'execute').resolves(result);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um objeto', async () => {
    const id = 1;
    const response = await SalesProductsModel.exclude(id);
    expect(response).to.be.a('object');
  });

  it('Retorna um objeto com affectedRows', async () => {
    const id = 1;
    const response = await SalesProductsModel.exclude(id);
    expect(response).to.have.property('affectedRows');
  });

  it('Retorna um objeto com affectedRows com o valor 1', async () => {
    const id = 1;
    const { affectedRows } = await SalesProductsModel.exclude(id);
    expect(affectedRows).to.equals(1);
  });
});