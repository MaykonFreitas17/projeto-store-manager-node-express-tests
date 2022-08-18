const SalesService = require('../services/SalesService');

const getAll = async (_req, res) => {
  try {
    const sales = await SalesService.getAll();
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
};