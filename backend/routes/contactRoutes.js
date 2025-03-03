const express = require("express");
const router = express.Router();
const { submitMessage } = require("../controllers/contactController"); // Import the controller

// POST route for handling the form submission
router.post("/submit", submitMessage);

module.exports = router;


