const Donation = require("../models/Donation");
const Donor = require("../models/donor");
const Beneficiary = require("../models/beneficiary");
const jwt = require("jsonwebtoken"); // For decoding the token

// Function to add a new donation
const addDonation = async (req, res) => {
  const { debtor_id, amount, payment_method, payment_status } = req.body; // debtor_id should match Beneficiary id

  try {
    // Extract the token from the header
    const token = req.headers.authorization?.split(" ")[1]; // Assuming "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Authorization token is required" });
    }

    // Decode the token to get the payload
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Get the user's id from the token payload
    const userId = decodedToken.id;

    // Check if the user is a donor
    if (decodedToken.role !== "donor") {
      return res
        .status(403)
        .json({ error: "Access denied. Only donors can create donations." });
    }

    // Instead of using the token id as donor id, find the donor record by matching the user_id
    const donorRecord = await Donor.findOne({ where: { user_id: userId } });
    if (!donorRecord) {
      return res.status(404).json({ error: "Donor not found" });
    }

    // Check if beneficiary exists
    const beneficiary = await Beneficiary.findByPk(debtor_id); // debtor_id as provided
    if (!beneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

    // Create a new donation using donorRecord.id as the donor_id
    const newDonation = await Donation.create({
      donor_id: donorRecord.id,  // Use the donor record's primary key
      debtor_id,                // as provided in the request
      amount,
      payment_method,
      payment_status,
    });

    res.status(201).json(newDonation);
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addDonation,
};
