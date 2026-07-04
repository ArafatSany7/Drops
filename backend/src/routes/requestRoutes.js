const express = require('express');
const { getUrgentRequests, createRequest } = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/urgent', getUrgentRequests);
router.post('/', protect, createRequest); 

module.exports = router;
