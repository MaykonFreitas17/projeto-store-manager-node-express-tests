const connection = require('./connection');

const getAll = async () => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return response;
};

const getById = async (id) => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [id],
  );
  return response;
};

const create = async (name) => {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return response;
};

const update = async (id, name) => {
  const [response] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return response;
};

const exclude = async (id) => {
  const [response] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return response;
};

const getByName = async (name) => {
  const [response] = await connection.execute(
    `SELECT id, name FROM StoreManager.products WHERE name LIKE "%${name}%"`,
  );
  return response;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getByName,
};