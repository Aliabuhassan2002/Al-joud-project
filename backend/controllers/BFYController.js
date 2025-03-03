const Beneficiary = require("../models/beneficiary");

// Get all users
const getAllBFY = async (req, res) => {
  try {
    const BFY = await Beneficiary.findAll();
    console.log(BFY)
    res.status(200).json(BFY);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving Beneficiary" });
  }
};

// Get a user by ID
const getBFYById = async (req, res) => {
  try {
    const BFY = await Beneficiary.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Beneficiary not found" });
    console.log(BFY);
    res.status(200).json(BFY);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving Beneficiary" });
  }
};

module.exports = { getAllBFY, getBFYById };
