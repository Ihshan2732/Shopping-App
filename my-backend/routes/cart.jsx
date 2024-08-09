const express = require('express');
const router = express.Router();
//const { addToCart } = require('../controllers/cartController');
const cartController = require('../controllers/cartController');


//router.post('/cart', addToCart);
router.post('/cart', cartController.addItem);
router.get('/cart', cartController.getCartItems);
router.put('/cart/:id', cartController.updateCartItem);
router.delete('/cart/:id', cartController.removeCartItem);

module.exports = router;
