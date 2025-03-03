// topDonorRoutes.js
const express = require('express');
const router = express.Router();
const { getTopDonors } = require('../controllers/topDonorController');

// Ensure the route is '/api/top/donors'
router.get('/donors', getTopDonors);

module.exports = router;
