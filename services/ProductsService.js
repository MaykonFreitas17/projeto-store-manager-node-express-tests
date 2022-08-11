const ProductsModel = require('../models/ProductsModel');

const getAll = async () => { 
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  try {
    const product = await ProductsModel.getById(id);
    console.log(product);
    if (product.length === 0) return false;
    return product[0];
  } catch (err) {
    return { status: 500, message: err.message };
  } 
};

module.exports = {
  getAll,
  getById,
};