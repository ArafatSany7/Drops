const express = require('express');
const { getAllPosts, getPostBySlug, createPost, updatePost, deletePost } = require('../controllers/blogController');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

// Admin-only routes
router.post('/', protect, requireAdmin, createPost);
router.put('/:id', protect, requireAdmin, updatePost);
router.delete('/:id', protect, requireAdmin, deletePost);

module.exports = router;
