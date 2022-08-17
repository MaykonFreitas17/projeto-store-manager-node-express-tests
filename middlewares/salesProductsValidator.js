const salesProductsSchema = require('../schemas/SalesProductsValidator');

const isProductValid = (salesProducts) => {
  const isValid = salesProductsSchema.validate(salesProducts);
  return isValid;
};

const createAndUpdate = (productId, quantity) => {
  const salesProducts = { productId, quantity };
  const validate = isProductValid(salesProducts);
  const { error } = validate;
  if (error) {
    const [code, message] = error.message.split('|');
    return { code, message };
  }
  return validate.value;
};

module.exports = {
  createAndUpdate,
};