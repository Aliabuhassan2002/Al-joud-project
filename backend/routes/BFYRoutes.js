const express = require('express');
const Beneficiary = require('../controllers/BFYController'); // Import user controller
const router = express.Router();

// Get all users
router.get('/', Beneficiary.getAllBFY);

// Get a user by ID
router.get('/:id', Beneficiary.getBFYById);

module.exports = router;
