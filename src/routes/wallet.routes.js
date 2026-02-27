const express = require("express");
const walletController = require("../controllers/wallet.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/me", walletController.getWalletDetails);
router.get("/me/balance", walletController.getWalletBalance);

module.exports = router;

