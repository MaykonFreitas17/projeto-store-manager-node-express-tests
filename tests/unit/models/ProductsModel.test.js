const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');


describe('Ao chamar as funções do ProductsModel', () => {

  describe('Buscando todos os produtos cadastrados', () => {
    before(async () => {
      const products = [
        [
          { id: 1, name: 'Martelo de Thor' },
          { id: 2, name: 'Traje de encolhimento' },
          { id: 3, name: 'Escudo do Capitão América' },
        ]
      ];
      sinon.stub(connection, 'execute').resolves(products);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna uma lista de Produtos', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.a('array');
    });

    it('retorna todos os produtos', async () => {
      const response = await ProductsModel.getAll();
      expect(response.length).to.be.equals(3);
    });

    it('produto tem "id" e "name"', async () => {
      const response = await ProductsModel.getAll();
      response.forEach((product) => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
      })
    });
  });

  describe('Buscando um produtos cadastrado por ID', () => {
    before(async () => {
      const product = [
        { id: 1, name: 'Martelo de Thor' },
      ];
      sinon.stub(connection, 'execute').resolves(product);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto Produto', async () => {
      const response = await ProductsModel.getById(1);
      expect(response).to.be.a('object');
    });

    it('retorna um produtos com ID igual a "1"', async () => {
      const response = await ProductsModel.getById(1);
      expect(response.id).to.be.equals(1);
    });

    it('retorna um produtos com name igual a "Martelo de Thor"', async () => {
      const response = await ProductsModel.getById(1);
      expect(response.name).to.be.equals('Martelo de Thor');
    });
  });

});