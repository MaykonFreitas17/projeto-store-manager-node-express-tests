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

const update = async (id, name) => {
  // Validadando o ID
  const productByID = await ProductsModel.getById(id);
  if (productByID.length === 0) return { code: 404, message: 'Product not found' };
  // Validando o Nome
  const validate = ProductValidate.createAndUpdate(name);
  const { code, message } = validate;
  if (code && message) {
    return { code, message };
  }
  await ProductsModel.update(id, name);
  return { id: Number(id), name };
};

const exclude = async (id) => {
  // Validadando o ID
  const productByID = await ProductsModel.getById(id);
  if (productByID.length === 0) return { code: 404, message: 'Product not found' };
  await ProductsModel.exclude(id);
  return true;
};

const getByName = async (name) => {
  if (name === undefined || name === '') {
    const products = await ProductsModel.getAll();
    return products;
  }
  const products = await ProductsModel.getByName(name);
  return products;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getByName,
};