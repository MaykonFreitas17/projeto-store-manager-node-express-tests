const ProductsModel = require('../models/ProductsModel');

const getAll = async () => { 
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  if (product.length === 0) return false;
  return product[0];
};

const create = async ({ name }) => {
  const product = await ProductsModel.getById({ name });
  if (product.length === 0) return false;
  return product[0];
};

module.exports = {
  getAll,
  getById,
  create,
};