// controllers/authController.js
const { registerUser, loginUser } = require("../services/authService");

const register = async (request, h) => {
  try {
    const { email, password } = request.payload;
    const user = await registerUser(email, password);
    return h.response({ message: "User registered successfully" }).code(201);
  } catch (err) {
    return h.response({ error: err.message }).code(400);
  }
};

const login = async (request, h) => {
  try {
    const { email, password } = request.payload;
    const token = await loginUser(email, password);
    return h.response({ token }).code(200);
  } catch (err) {
    return h.response({ error: err.message }).code(400);
  }
};

module.exports = {
  register,
  login,
};
