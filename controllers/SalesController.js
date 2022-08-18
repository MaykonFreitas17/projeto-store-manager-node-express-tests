const SalesService = require('../services/SalesService');

const getAll = async (_req, res) => {
  try {
    const sales = await SalesService.getAll();
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await SalesService.getById(id);
    const { code, message } = sales;
    if (code && message) {
      return res.status(code).json({ message });
    }
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await SalesService.exclude(id);
    const { code, message } = sales;
    if (code && message) {
      return res.status(code).json({ message });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  exclude,
};