const express = require('express');
const { getDonors, getDonorById } = require('../controllers/donorController');

const router = express.Router();

router.get('/', getDonors);
router.get('/:id', getDonorById);

module.exports = router;
