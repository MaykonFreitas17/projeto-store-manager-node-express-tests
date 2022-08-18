const connection = require('./connection');

const serialize = (sales) => ({
  saleId: sales.id,
  date: sales.date,
  productId: sales.product_id,
  quantity: sales.quantity,
});

const serializeForGetById = (sales) => ({
  date: sales.date,
  productId: sales.product_id,
  quantity: sales.quantity,
});

const create = async () => {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return response;
};

const getAll = async () => {
  const [response] = await connection.execute(
  `
    SELECT sale.id, sale.date, sale_product.product_id, sale_product.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS sale_product
    ON sale.id = sale_product.sale_id
    ORDER BY sale.id ASC, sale_product.product_id
  `,
  );
  return response.map(serialize);
};

const getById = async (id) => {
  const [response] = await connection.execute(
    `
    SELECT sale.id, sale.date, sale_product.product_id, sale_product.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS sale_product
    ON sale.id = sale_product.sale_id
    WHERE sale.id = ?
    ORDER BY sale.id ASC, sale_product.product_id
  `,
    [id],
  );
  return response.map(serializeForGetById);
};

const exclude = async (id) => {
  const [response] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return response;
};

module.exports = {
  create,
  getAll,
  getById,
  exclude,
};