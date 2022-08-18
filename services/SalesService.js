const SalesModel = require('../models/SalesModel');
const SalesProductsModel = require('../models/SalesProductsModel');

const getAll = async () => {
  const sales = SalesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const product = await SalesModel.getById(id);
  if (product.length === 0) return { code: 404, message: 'Sale not found' };
  return product;
};

const exclude = async (id) => {
  const sale = await SalesModel.getById(id);
  if (sale.length === 0) return { code: 404, message: 'Sale not found' };
  await SalesModel.exclude(id);
  await SalesProductsModel.exclude(id);
  return true;
};

module.exports = {
  getAll,
  getById,
  exclude,
};