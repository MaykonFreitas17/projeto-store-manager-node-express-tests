const connection = require('./connection');

const serialize = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
});

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
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
    [productId, quantity, id],
  );
  return response.map(serialize);
};

module.exports = {
  create,
  exclude,
  update,
};