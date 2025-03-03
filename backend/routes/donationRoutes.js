const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

// Route to add a new donation
router.post("/donations", donationController.addDonation);

module.exports = router;
