const express = require("express");
// Import auth middleware
const { authentication } = require("../middlewares/authDonor");

const { getMe, getUserDonations } = require("../controllers/getMeController");

const router = express.Router();

router.get("/me", authentication, getMe);
router.get("/:id/donations", authentication, getUserDonations);

module.exports = router;
