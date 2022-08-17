const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const SalesModel = require('../../../models/SalesModel');
const SalesProductsModel = require('../../../models/SalesProductsModel');
const SalesProductsService = require('../../../services/SalesProductsService');


describe('Ao Cadastrar uma nova venda e vendas_produtos - SalesProductsServices', () => {
  describe('Cadastro de venda e vendas_produtos com SUCESSO', () => {
    const salesProducts = [
      { productId: 1, quantity: 1 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(ProductsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor'})
      sinon.stub(SalesModel, 'create').resolves({ insertId: 1 });
      sinon.stub(SalesProductsModel, 'create').resolves({});
    });

    after(async () => {
      ProductsModel.getById.restore();
      SalesModel.create.restore();
      SalesProductsModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "ID"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('id');
    });

    it('Retorna um objeto com a propriedade "itemsSold"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('itemsSold');
    });

    it('A propriedade itemsSold é uma lista de objetos', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.itemsSold).to.be.a('array');
    });

    it('Os objetos do itemsSold tem a propriedade "productId"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      const { itemsSold } = await response;
      itemsSold.forEach((item) => expect(item).to.have.property('productId'));
    });

    it('Os objetos do itemsSold tem a propriedade "quantity"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      const { itemsSold } = await response;
      itemsSold.forEach((item) => expect(item).to.have.property('quantity'));
    });
  });

  describe('Cadastro vendas_produtos sem SUCESSO - Sem o Campo "productId"', () => {
    const salesProducts = [
      { quantity: 1 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(ProductsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' })
      sinon.stub(SalesModel, 'create').resolves({});
      sinon.stub(SalesProductsModel, 'create').resolves({});
    });

    after(async () => {
      ProductsModel.getById.restore();
      SalesModel.create.restore();
      SalesProductsModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "CODE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "MESSAGE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade CODE com o valor 400', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.code).to.equal(400);
    });

    it('Retorna um objeto com a propriedade MESSAGE com o valor "productId is required"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.message).to.equal('"productId" is required');
    });
  });

  describe('Cadastro vendas_produtos sem SUCESSO - Sem o Campo "quantity"', () => {
    const salesProducts = [
      { productId: 1 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(ProductsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' })
      sinon.stub(SalesModel, 'create').resolves({});
      sinon.stub(SalesProductsModel, 'create').resolves({});
    });

    after(async () => {
      ProductsModel.getById.restore();
      SalesModel.create.restore();
      SalesProductsModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "CODE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "MESSAGE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade CODE com o valor 400', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.code).to.equal(400);
    });

    it('Retorna um objeto com a propriedade MESSAGE com o valor "quantity is required"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.message).to.equal('"quantity" is required');
    });
  });

  describe('Cadastro vendas_produtos sem SUCESSO - campo "quantity" menor ou igual a zero', () => {
    const salesProducts = [
      { productId: 1, quantity: 0 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(ProductsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' })
      sinon.stub(SalesModel, 'create').resolves({});
      sinon.stub(SalesProductsModel, 'create').resolves({});
    });

    after(async () => {
      ProductsModel.getById.restore();
      SalesModel.create.restore();
      SalesProductsModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "CODE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "MESSAGE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade CODE com o valor 422', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.code).to.equal(422);
    });

    it('Retorna um objeto com a propriedade MESSAGE com o valor "quantity must be greater than or equal to 1"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.message).to.equal('"quantity" must be greater than or equal to 1');
    });
  });

  describe('Cadastro vendas_produtos sem SUCESSO - Produto Inexistente', () => {
    const salesProducts = [
      { productId: 5, quantity: 0 },
      { productId: 1, quantity: 2 },
    ];

    before(async () => {
      sinon.stub(ProductsModel, 'getById').resolves([])
      sinon.stub(SalesModel, 'create').resolves({});
      sinon.stub(SalesProductsModel, 'create').resolves({});
    });

    after(async () => {
      ProductsModel.getById.restore();
      SalesModel.create.restore();
      SalesProductsModel.create.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.be.a('object');
    });

    it('Retorna um objeto com a propriedade "CODE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('code');
    });

    it('Retorna um objeto com a propriedade "MESSAGE"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response).to.have.property('message');
    });

    it('Retorna um objeto com a propriedade CODE com o valor 404', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.code).to.equal(404);
    });

    it('Retorna um objeto com a propriedade MESSAGE com o valor "Product not found"', async () => {
      const response = await SalesProductsService.create(salesProducts);
      expect(response.message).to.equal('Product not found');
    });
  });
});