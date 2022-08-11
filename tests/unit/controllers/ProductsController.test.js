const sinon = require('sinon');
const { expect } = require('chai');

// const ProductsService = require('../../../services/ProductsService');
// const ProductsController = require('../../../controllers/ProductsController');

describe('Ao chamar as funções do ProductsController', () => {

  describe('Ao chamar a função getAll', () => {
    before(async () => {
      const response = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
      response.status = sinon.stub().returns(response);
    });
  });
});