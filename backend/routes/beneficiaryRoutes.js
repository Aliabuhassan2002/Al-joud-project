const express = require("express");
const beneficiaryController = require("../controllers/beneficiaryController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

// Get all beneficiaries for a given user id (requires authentication)
router.get("/:id", authenticate, beneficiaryController.getAllAds);

// Create a new beneficiary (requires authentication)
router.post(
  "/",
  authenticate,
  upload.single("identity_image"),
  beneficiaryController.createBeneficiary
);

module.exports = router;
