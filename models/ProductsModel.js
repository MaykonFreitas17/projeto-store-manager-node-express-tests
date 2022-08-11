const connection = require('./connection');

const getAll = async () => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return response;
};

const getById = async (id) => {
  try {
    const [response] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id=?',
      [id],
    );
    return response;
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

module.exports = {
  getAll,
  getById,
};