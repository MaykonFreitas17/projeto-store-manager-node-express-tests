const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');


describe('Testando os ações dos Produtos - Service', () => {

  describe('Buscando todos os produtos cadastrados', () => {
    before(async () => {
      const products = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      sinon.stub(ProductsModel, 'getAll').resolves(products);
    });

    after(async () => {
      ProductsModel.getAll.restore();
    });

    it('retorna uma lista de Produtos', async () => {
      const response = await ProductsService.getAll();
      expect(response).to.be.a('array');
    });

    it('retorna todos os produtos', async () => {
      const response = await ProductsService.getAll();
      expect(response.length).to.be.equals(3);
    });

    it('produto tem "id" e "name"', async () => {
      const response = await ProductsService.getAll();
      response.forEach((product) => {
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
      })
    });
  });

  describe('Buscando um produtos cadastrado por ID', () => {
    describe('Buscando por um produto existente no banco de dados', () => {
      before(async () => {
        const product = [
          { id: 1, name: 'Martelo de Thor' },
        ];
        sinon.stub(ProductsModel, 'getById').resolves(product);
      });

      after(async () => {
        ProductsModel.getById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await ProductsService.getById(1);
        expect(response[0]).to.be.a('object');
      });
      it('Retorna um objeto com "ID" e "NAME"', async () => {
        const response = await ProductsService.getById(1);
        expect(response[0]).to.have.property('id');
        expect(response[0]).to.have.property('name');
      });
      it('Retorna um objeto com "ID" igual a 1', async () => {
        const response = await ProductsService.getById(1);
        expect(response[0].id).to.be.equals(1);
      });
    });

    describe('Buscando por um produto não existente no banco de dados', () => {
      before(async () => {
        const product = [];
        sinon.stub(ProductsModel, 'getById').resolves(product);
      });

      after(async () => {
        ProductsModel.getById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await ProductsService.getById(1);
        expect(response).to.be.a('object');
      });

      it('Retorna um objeto com "STATUS" e "MESSAGE"', async () => {
        const response = await ProductsService.getById(1);
        expect(response).to.have.property('status');
        expect(response).to.have.property('message');
      });

      it('Retorna um objeto com "STATUS" igual a 404', async () => {
        const response = await ProductsService.getById(1);
        expect(response.status).to.be.equals(404);
      });

      it('Retorna um objeto com "MESSAGE" igual a "Product not found"', async () => {
        const response = await ProductsService.getById(1);
        expect(response.message).to.be.equals('Product not found');
      });
    });
  });

});