const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/SalesService');
const SalesProductsModel = require('../../../models/SalesProductsModel');

describe('Ao listar todas as vendas - SalesService', () => {
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
    sinon.stub(SalesModel, 'getAll').resolves(sales);
  });

  after(async () => {
    SalesModel.getAll.restore();
  });

  it('Retorna uma lista com as vendas', async () => {
    const response = await SalesService.getAll();
    expect(response).to.be.a('array');
  });

  it('Retorna um lista com vendas com a propriedade "saleId"', async () => {
    const response = await SalesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('saleId'));
  });

  it('Retorna um lista com vendas com a propriedade "date"', async () => {
    const response = await SalesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('date'));
  });

  it('Retorna um lista com vendas com a propriedade "productId"', async () => {
    const response = await SalesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('productId'));
  });

  it('Retorna um lista com vendas com a propriedade "quantity"', async () => {
    const response = await SalesService.getAll();
    response.forEach((sale) => expect(sale).to.have.property('quantity'));
  });
});

describe('Ao listar uma venda pelo o seu "ID"', async () => {
  describe('Ao listar um venda com Sucesso', () => {
    const sales = [
      {
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ];

    before(async () => {
      sinon.stub(SalesModel, 'getById').resolves(sales);
    });

    after(async () => {
      SalesModel.getById.restore();
    });

    it('Retorna uma lista com as vendas', async () => {
      const response = await SalesService.getById();
      expect(response).to.be.a('array');
    });

    it('Retorna um lista com vendas com a propriedade "date"', async () => {
      const response = await SalesService.getById();
      response.forEach((sale) => expect(sale).to.have.property('date'));
    });

    it('Retorna um lista com vendas com a propriedade "productId"', async () => {
      const response = await SalesService.getById();
      response.forEach((sale) => expect(sale).to.have.property('productId'));
    });

    it('Retorna um lista com vendas com a propriedade "quantity"', async () => {
      const response = await SalesService.getById();
      response.forEach((sale) => expect(sale).to.have.property('quantity'));
    });
  });
  describe('Ao listar um produto inexistente', () => {
    before(async () => {
      sinon.stub(SalesModel, 'getById').resolves([]);
    });

    after(async () => {
      SalesModel.getById.restore();
    });

    it('Retorna um objeto', async () => {
      const id = 5;
      const response = await SalesService.getById(id);
      expect(response).to.be.a('object');
    });
    it('Retornar um objeto com a propriedade "CODE"', async () => {
      const id = 5;
      const response = await SalesService.getById(id);
      expect(response).to.have.property('code');
    });
    it('Retornar um objeto com a propriedade "CODE" com o valor 404', async () => {
      const id = 5;
      const response = await SalesService.getById(id);
      expect(response.code).to.equal(404);
    });
    it('Retornar um objeto com a propriedade "MESSAGE"', async () => {
      const id = 5;
      const response = await SalesService.getById(id);
      expect(response).to.have.property('message');
    });
    it('Retornar um objeto com a propriedade "MESSAGE" com o valor "Sale not found"', async () => {
      const id = 5;
      const response = await SalesService.getById(id);
      expect(response.message).to.equal('Sale not found');
    });
  });
});

describe('Ao excluir uma venda - SalesService', () => {
  describe('Ao excluir uma venda com SUCESSO', () => {
    before(async () => {
      sinon.stub(SalesModel, 'exclude').resolves({});
      sinon.stub(SalesProductsModel, 'exclude').resolves({});
    });

    after(async () => {
      SalesModel.exclude.restore();
      SalesProductsModel.exclude.restore();
    });

    it('Retonar um Booleano', async () => {
      const id = 2;
      const response = await SalesService.exclude(id);
      expect(response).to.be.a('boolean');
    });
    it('Retonar um Booleano com o valor "TRUE"', async () => {
      const id = 2;
      const response = await SalesService.exclude(id);
      expect(response).to.be.true;
    }); 
  });

  describe('Ao tentar excluir uma venda inexistente', () => {
    before(async () => {
      sinon.stub(SalesModel, 'exclude').resolves({});
      sinon.stub(SalesProductsModel, 'exclude').resolves({});
    });

    after(async () => {
      SalesModel.exclude.restore();
      SalesProductsModel.exclude.restore();
    });

    it('Retonar um objeto', async () => {
      const id = 5;
      const response = await SalesService.exclude(id);
      expect(response).to.be.a('object');
    });
    it('Retonar um objeto com a propriedade "CODE"', async () => {
      const id = 5;
      const response = await SalesService.exclude(id);
      expect(response).to.have.property('code');
    });
    it('Retonar um objeto com a propriedade "MESSAGE"', async () => {
      const id = 5;
      const response = await SalesService.exclude(id);
      expect(response).to.have.property('message');
    });
    it('Retonar um objeto com a propriedade "CODE" com o valor 404', async () => {
      const id = 5;
      const response = await SalesService.exclude(id);
      expect(response.code).to.equals(404);
    });
    it('Retonar um objeto com a propriedade "MESSAGE" com o valor "Sale not found"', async () => {
      const id = 5;
      const response = await SalesService.exclude(id);
      expect(response.message).to.equals('Sale not found');
    });
  });
});