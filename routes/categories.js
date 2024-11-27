const express = require('express');
const categoryController  = require('../controllers/categoryController');
const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.addCategory);
router.post('/categories/update/:id', categoryController.updateCategory);
router.post('/categories/delete/:id', categoryController.deleteCategory);


module.exports = router;
