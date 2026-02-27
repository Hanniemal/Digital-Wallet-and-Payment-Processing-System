const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const walletService = require("./wallet.service");

const allowedRoles = ["admin", "staff", "user"];

const register = async ({ name, email, password, role }) => {
  if (!name || !email || !password) {
    const error = new Error("name, email, and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedRole = role ? role.trim().toLowerCase() : "user";

  if (!allowedRoles.includes(normalizedRole)) {
    const error = new Error("Invalid role. Use admin, staff, or user");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  let user;
  let wallet;

  try {
    user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedRole || "user",
    });

    wallet = await walletService.createWalletForUser({
      userId: user._id,
      currency: "NGN",
    });
  } catch (createError) {
    if (user && user._id) {
      await User.findByIdAndDelete(user._id);
    }
    throw createError;
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  });

  return {
    user: user.toPublicJSON(),
    wallet: wallet.toPublicJSON(),
    token,
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  });

  return {
    user: user.toPublicJSON(),
    token,
  };
};

module.exports = {
  register,
  login,
};
