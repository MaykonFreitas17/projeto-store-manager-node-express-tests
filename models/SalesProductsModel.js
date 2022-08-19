const connection = require('./connection');

// const serialize = (sale) => ({
//   productId: sale.product_id,
//   quantity: sale.quantity,
// });

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

const update = async (id, productId, quantity) => {
  const [response] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );
  return response;
};

module.exports = {
  create,
  exclude,
  update,
};