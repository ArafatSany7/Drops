const express = require('express');
const { register, login, googleAuth, updateProfile } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.put('/profile', updateProfile);

module.exports = router;
