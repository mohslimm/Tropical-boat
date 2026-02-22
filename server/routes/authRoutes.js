const express = require('express');
const router = express.Router();
const { loginUser, getMe, registerAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerAdmin); // Only works if no admin exists yet
router.get('/me', protect, getMe);

module.exports = router;
