const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/deposit", transactionController.deposit);
router.post("/withdraw", transactionController.withdraw);
router.post("/transfer", transactionController.transfer);
router.get("/history", transactionController.getHistory);

module.exports = router;

