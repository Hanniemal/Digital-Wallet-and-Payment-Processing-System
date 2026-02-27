const userService = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers({
      page: req.query.page,
      limit: req.query.limit,
    });

    return res.status(200).json({
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const result = await userService.getUserById({
      userId: req.params.userId,
      requester: req.user,
    });

    return res.status(200).json({
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch user",
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const result = await userService.updateUserRole({
      userId: req.params.userId,
      role: req.body.role,
    });

    return res.status(200).json({
      message: "User role updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to update role",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser({
      userId: req.params.userId,
    });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to delete user",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
};

