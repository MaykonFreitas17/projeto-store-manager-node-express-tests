const express = require('express');

const routes = express.Router();

const SalesController = require('../controllers/SalesController');
const SalesProductsController = require('../controllers/SalesProductsController');

routes.get('/', SalesController.getAll);
routes.post('/', SalesProductsController.create);

module.exports = routes;