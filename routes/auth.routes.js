const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

router.post('/register', userController.createUser);
router.post('/login', authController.login)

module.exports = router;