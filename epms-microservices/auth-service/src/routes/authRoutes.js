const express = require('express');
const router = express.Router();
const { register, login, getUser, updateUser, getUserByUUID } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/getUser', getUser);
router.get('/getUserByUUID', getUserByUUID);
router.put('/update', updateUser);

module.exports = router;
