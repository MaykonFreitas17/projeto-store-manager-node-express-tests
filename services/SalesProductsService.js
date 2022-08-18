const ProductsModel = require('../models/ProductsModel');
const SalesModel = require('../models/SalesModel');
const SalesProductsModel = require('../models/SalesProductsModel');

const salesProductsValidate = require('../middlewares/salesProductsValidator');

const isProductFound = async (id) => {
  if (id === undefined || id === '') return { code: 400, message: '"productId" is required' };
  const productID = await ProductsModel.getById(id);
  if (productID.length === 0) return { code: 404, message: 'Product not found' };
  return true;
};

const createValidatioError = async (salesProducts) => {
  const validations = await Promise.all(salesProducts.map(async (saleProduct) => {
    const { productId, quantity } = saleProduct;
    const validate = salesProductsValidate.createAndUpdate(productId, quantity);
    const product = await isProductFound(productId);
    const { code, message } = validate;

    if (product.code && product.message) return product;
    if (code && message) return { code: Number(code), message };
    
    return true;
  }));

  return validations;
};

const create = async (salesProducts) => {
  const validateProduct = await createValidatioError(salesProducts);
  const isValidate = validateProduct.find((validate) => Object.keys(validate).includes('code'));
  if (isValidate) return isValidate;
  const { insertId } = await SalesModel.create();
  // Cadastrando as sales_products
  salesProducts.forEach(async (sales) => {
    const { productId, quantity } = sales;
    await SalesProductsModel.create(insertId, productId, quantity);
  });
  
  return { id: insertId, itemsSold: salesProducts };
};

const update = async (id, salesProducts) => {
  const sale = await SalesModel.getById(id);
  if (sale.length === 0) return { code: 404, message: 'Sale not found' };
  const validateProduct = await createValidatioError(salesProducts);
  const isValidate = validateProduct.find((validate) => Object.keys(validate).includes('code'));
  if (isValidate) return isValidate;
  // Cadastrando as sales_products
  salesProducts.forEach(async (sales) => {
    const { productId, quantity } = sales;
    await SalesProductsModel.update(id, productId, quantity);
  });
  return { id, itemsUpdated: salesProducts };
};

module.exports = {
  create,
  update,
};