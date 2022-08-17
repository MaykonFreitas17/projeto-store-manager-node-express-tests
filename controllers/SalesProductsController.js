const SalesProductsService = require('../services/SalesProductsService');

const create = async (req, res) => {
  try {
    const salesProducts = req.body;
    const salesPrductsValidation = await SalesProductsService.create(salesProducts);
    const { code, message } = salesPrductsValidation;
    if (code && message) {
      return res.status(code).json({ message });
    }
    return res.status(201).json(salesPrductsValidation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
};