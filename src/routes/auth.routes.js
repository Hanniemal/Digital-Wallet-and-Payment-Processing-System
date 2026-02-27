const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Authorized user",
    data: req.user,
  });
});

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.status(200).json({
    message: "Admin access granted",
    data: req.user,
  });
});

router.get(
  "/staff",
  authMiddleware,
  roleMiddleware("admin", "staff"),
  (req, res) => {
    res.status(200).json({
      message: "Staff access granted",
      data: req.user,
    });
  },
);

module.exports = router;

