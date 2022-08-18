const connection = require('./connection');

const create = async (saleId, productId, quantity) => {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return response;
};

const exclude = async (id) => {
  const [response] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return response;
};

module.exports = {
  create,
  exclude,
};