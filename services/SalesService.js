const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  const sales = SalesModel.getAll();
  return sales;
};

module.exports = {
  getAll,
};