const express = require('express');
const router = express.Router();
//const { signup, login, logout } = require('../controllers/authController');
const userController = require('../controllers/userController');

// router.post('/signup', signup);
// router.post('/login', login);
// router.post('/logout', logout);

outer.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);


module.exports = router;
