const express = require('express');

const router = express.Router();

const ProductsController = require('../controllers/ProductsController');

router.get('/', ProductsController.getAll);
router.get('/search', ProductsController.getByName);
router.get('/:id', ProductsController.getById);
router.post('/', ProductsController.create);
router.put('/:id', ProductsController.update);
router.delete('/:id', ProductsController.exclude);

module.exports = router;