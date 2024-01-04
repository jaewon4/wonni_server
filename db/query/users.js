const connection = require("../index");

const getAllUsers = (callback) => {
  connection.query("SELECT * FROM users", callback);
};

const addUser = (name, callback) => {
  connection.query("INSERT INTO users (name) VALUES (?)", [name], callback);
};

const updateUser = (userId, newName, callback) => {
  connection.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [newName, userId],
    callback
  );
};

const deleteUser = (userId, callback) => {
  connection.query("DELETE FROM users WHERE id = ?", [userId], callback);
};

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
