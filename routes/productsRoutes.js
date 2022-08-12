const express = require('express');

const router = express.Router();

const ProductsController = require('../controllers/ProductsController');

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.post('/', ProductsController.create);

module.exports = router;