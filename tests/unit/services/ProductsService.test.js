const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');


describe('Ao chamar as funções do ProductsService', () => {

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
        const product = [{ id: 1, name: 'Martelo de Thor' }];
        sinon.stub(ProductsModel, 'getById').resolves(product);
      });

      after(async () => {
        ProductsModel.getById.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await ProductsService.getById(1);
        expect(response).to.be.a('object');
      });
      it('Retorna um objeto com "ID" e "NAME"', async () => {
        const response = await ProductsService.getById(1);
        expect(response).to.have.property('id');
        expect(response).to.have.property('name');
      });
      it('Retorna um objeto com "ID" igual a 1', async () => {
        const response = await ProductsService.getById(1);
        expect(response.id).to.be.equals(1);
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

      it('Retorna um booleano', async () => {
        const response = await ProductsService.getById(4);
        expect(response).to.be.a('boolean');
      });

      it('Retorna um false', async () => {
        const response = await ProductsService.getById(4);
        expect(response).to.be.false;
      });
    });
  });

  describe('Cadastrando um nome Produto', () => {
    describe('Passando um nome válido', () => {
      before(async () => {
        const product = [
          { id: 1, name: 'Martelo de Thor' },
        ];
        sinon.stub(ProductsModel, 'create').resolves(product);
      });

      after(async () => {
        ProductsModel.create.restore();
      });

      it('Retorna um Objeto', async () => {
        const response = await ProductsService.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.be.a('object');
      });
      it('Retorna um Objeto com ID', async () => {
        const response = await ProductsService.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.have.property('id');
      });
      it('Retorna um Objeto com NAME', async () => {
        const response = await ProductsService.create({ name: 'Armadura do Homem de Ferro' });
        expect(response).to.have.property('name');
      });
    });

    describe('Passando um nome inválido', () => {
      // before(async () => {
      //   const product = [];
      //   sinon.stub(ProductsModel, 'create').resolves(product);
      // });

      // after(async () => {
      //   ProductsModel.create.restore();
      // });
      it('Retorna um booleano se o nome for uma string vazia', async () => {
        const response = await ProductsService.create({ name: '' });
        expect(response).to.be.a('boolean');
      });
      it('Retorna um booleano com FALSE se o nome for uma string vazia', async () => {
        const response = await ProductsService.create({ name: '' });
        expect(response).to.be.false;
      });
      it('Retorna um booleano se o nome não for definida', async () => {
        const response = await ProductsService.create({ });
        expect(response).to.be.a('boolean');
      });
      it('Retorna um booleano com FALSE se o nome não for definida', async () => {
        const response = await ProductsService.create({ });
        expect(response).to.be.false;
      });
    });
  });

});