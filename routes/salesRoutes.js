const express = require('express');

const routes = express.Router();

const SalesProductsController = require('../controllers/SalesProductsController');

routes.post('/', SalesProductsController.create);

module.exports = routes;