const connection = require('./connection');

const create = async () => {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return response;
};

module.exports = {
  create,
};