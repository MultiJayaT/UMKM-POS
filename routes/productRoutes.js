const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.put("/", productController.updateProduct);
router.delete("/", productController.deleteProduct);

module.exports = router;
