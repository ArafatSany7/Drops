const express = require('express');
const { getDonors } = require('../controllers/donorController');

const router = express.Router();

router.get('/', getDonors);

module.exports = router;
