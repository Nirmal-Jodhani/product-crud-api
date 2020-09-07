const express = require('express')
const router = express.Router();

const products = require('../controllers/product.controller.js');

// Create a new Product
router.post('/', products.create);

// Retrieve all Products
router.get('/', products.findAll);

// Retrieve a single Product with productId
router.get('/:productId', products.findOne);

// Update a Product with productId
router.put('/:productId', products.update);

// Delete a Product with productId
router.delete('/:productId', products.delete);


module.exports = router;