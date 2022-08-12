const ProductsService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();
  if (Object.keys(products).includes('status')) {
    const { status, message } = products;
    res.status(status).json({ message });
  }

  res.status(200).json(products);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await ProductsService.create(name);
    const { code, message } = product;
    if (code && message) {
      return res.status(code).json({ message });
    }
    return res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
};