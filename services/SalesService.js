const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  const sales = SalesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const product = await SalesModel.getById(id);
  if (product.length === 0) return { code: 404, message: 'Sale not found' };
  return product;
};

module.exports = {
  getAll,
  getById,
};