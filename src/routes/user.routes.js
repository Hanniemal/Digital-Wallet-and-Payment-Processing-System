const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", roleMiddleware("admin"), userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.patch(
  "/:userId/role",
  roleMiddleware("admin"),
  userController.updateUserRole,
);
router.delete("/:userId", roleMiddleware("admin"), userController.deleteUser);

module.exports = router;

