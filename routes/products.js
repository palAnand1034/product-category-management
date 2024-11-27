const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct);
router.post('/products/update/:id', productController.updateProduct);
router.post('/products/delete/:id', productController.deleteProduct);

module.exports = router;
