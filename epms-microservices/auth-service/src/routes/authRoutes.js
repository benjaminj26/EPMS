const express = require('express');
const router = express.Router();

const { register, login, getUser, updateUser, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/getUser', getUser);
router.put('/update', updateUser);
router.post('/user/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);  

module.exports = router;
