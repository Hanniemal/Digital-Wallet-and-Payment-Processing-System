const mongoose = require("mongoose");
const User = require("../models/user.model");

const allowedRoles = ["admin", "staff", "user"];

const parsePositiveInt = (value, fallback) => {
  if (value === undefined) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }

  return parsed;
};

const getAllUsers = async ({ page, limit }) => {
  const parsedPage = parsePositiveInt(page, 1);
  const parsedLimit = parsePositiveInt(limit, 10);

  if (!parsedPage || !parsedLimit) {
    const error = new Error("page and limit must be positive integers");
    error.statusCode = 400;
    throw error;
  }

  const skip = (parsedPage - 1) * parsedLimit;
  const [users, totalItems] = await Promise.all([
    User.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit)
      .select("-password"),
    User.countDocuments({}),
  ]);

  return {
    items: users.map((user) => user.toPublicJSON()),
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      totalItems,
      totalPages: Math.ceil(totalItems / parsedLimit) || 1,
    },
  };
};

const getUserById = async ({ userId, requester }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user id");
    error.statusCode = 400;
    throw error;
  }

  if (requester.role !== "admin" && requester.id !== userId) {
    const error = new Error("Forbidden: can only view your own profile");
    error.statusCode = 403;
    throw error;
  }

  const user = await User.findById(userId).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user.toPublicJSON();
};

const updateUserRole = async ({ userId, role }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user id");
    error.statusCode = 400;
    throw error;
  }

  const normalizedRole = String(role || "")
    .trim()
    .toLowerCase();

  if (!allowedRoles.includes(normalizedRole)) {
    const error = new Error("Invalid role. Use admin, staff, or user");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role: normalizedRole },
    { new: true, runValidators: true },
  ).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user.toPublicJSON();
};

const deleteUser = async ({ userId }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user id");
    error.statusCode = 400;
    throw error;
  }

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
};

