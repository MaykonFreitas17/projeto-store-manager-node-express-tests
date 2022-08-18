const connection = require('./connection');

const create = async () => {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return response;
};

const getAll = async () => {
  const [response] = await connection.execute(
  `
    SELECT sale.id AS "saleId", sale.date, sale_product.product_id, sale_product.quantity
    FROM StoreManager.sales AS sale
    INNER JOIN StoreManager.sales_products AS sale_product
    ON sale.id = sale_product.sale_id
    ORDER BY sale.id ASC, sale_product.product_id
  `,
  );
  return response;
};

module.exports = {
  create,
  getAll,
};