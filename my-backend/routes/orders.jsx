const express = require('express');
const router = express.Router();
//const { placeOrder } = require('../controllers/orderController');
const orderController = require('../controllers/orderController');
//router.post('/orders', placeOrder);

router.post('/orders', orderController.placeOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);


module.exports = router;
