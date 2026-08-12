const express = require('express');
const { submitContact, getMessages, markAsRead } = require('../controllers/contactController');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Public route
router.post('/', submitContact);

// Admin-only routes
router.get('/', protect, requireAdmin, getMessages);
router.put('/:id/read', protect, requireAdmin, markAsRead);

module.exports = router;
