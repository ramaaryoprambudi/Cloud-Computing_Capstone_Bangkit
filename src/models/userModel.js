// models/userModel.js
const bcrypt = require("bcryptjs");

const users = []; // Dummy data untuk menyimpan user sementara

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };
  users.push(user);
  return user;
};

const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

module.exports = {
  createUser,
  findUserByEmail,
};
