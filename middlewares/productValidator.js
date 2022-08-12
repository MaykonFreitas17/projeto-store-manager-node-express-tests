const productSchema = require('../schemas/ProductValidator');

const isProductValid = (product) => {
  const isValid = productSchema.validate(product);
  return isValid;
};

const createAndUpdate = (name) => {
  const product = { name };
  const validate = isProductValid(product);
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