const ProductsModel = require('../models/ProductsModel');

const getAll = async () => { 
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  if (product.length === 0) return { status: 404, message: 'Product not found' };
  return product;
};

module.exports = {
  getAll,
  getById,
};