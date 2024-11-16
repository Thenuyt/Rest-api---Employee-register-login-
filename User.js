const db = require('../config/db');

exports.createUser = (user, callback) => {
  const { username, password, email } = user;
  const query = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
  db.run(query, [username, password, email], callback);
};

exports.findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], callback);
};

