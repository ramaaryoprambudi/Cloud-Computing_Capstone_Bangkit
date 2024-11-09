// services/authService.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION } = require("../config/config");
const { createUser, findUserByEmail } = require("../models/userModel");

const registerUser = async (email, password) => {
  // Cek apakah email sudah terdaftar
  const existingUser = findUserByEmail(email);
  if (existingUser) throw new Error("Email already registered");

  // Simpan user baru
  const user = await createUser(email, password);
  return user;
};

const loginUser = async (email, password) => {
  // Cari user berdasarkan email
  const user = findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  // Verifikasi password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Generate JWT
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
