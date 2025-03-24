const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/createtransaksi", transactionController.createTransaction);
router.get("/", transactionController.getTransactions);

module.exports = router;
