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