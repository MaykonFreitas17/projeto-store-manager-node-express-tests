const ProductsModel = require('../models/ProductsModel');

const ProductValidate = require('../middlewares/productValidator');

const getAll = async () => { 
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  if (product.length === 0) return false;
  return product[0];
};

const create = async (name) => {
  const validate = ProductValidate.createAndUpdate(name);
  const { code, message } = validate;
  if (code && message) {
    return { code, message };
  }
  const { insertId } = await ProductsModel.create(name);
  return { id: insertId, name };
};

module.exports = {
  getAll,
  getById,
  create,
};