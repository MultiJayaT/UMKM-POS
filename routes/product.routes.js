const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const upload = require('../utils/multer.config');

router.post('/', verifyToken, isAdmin, upload.single('image'), productController.createProduct);
router.get('/', verifyToken, productController.getProducts);
router.get('/:id', verifyToken, productController.getProductById);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduk);


module.exports = router;