const express = require('express');
const { getAllUsers, updateUserRole, getDashboardStats, deleteUser } = require('../controllers/adminController');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, requireAdmin);

router.get('/users', getAllUsers);
router.put('/users/:userId/role', updateUserRole);
router.delete('/users/:userId', deleteUser);
router.get('/dashboard-stats', getDashboardStats);

module.exports = router;
