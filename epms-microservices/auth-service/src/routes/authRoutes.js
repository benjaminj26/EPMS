const express = require('express');
const router = express.Router();
const { register, login, getUser, updateUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/getUser', getUser);
router.put('/update', updateUser);

module.exports = router;
