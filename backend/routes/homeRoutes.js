const express = require('express');
const router = express.Router();
const {getBeneficiaries,} = require('../controllers/homeController');
  

// Get all users
router.get('/beneficiaries', getBeneficiaries);

module.exports = router;

