// topDonorController.js
const Donor = require('../models/donor');
const User = require('../models/user');

exports.getTopDonors = async (req, res) => {
  try {
    // Fetch donors with associated User
    const donors = await Donor.findAll({
      include: [
        {
          model: User,
          attributes: ['full_name'],

        },
      ],
      order: [['total_donated', 'DESC']], 
    });

    // Check if there are no donors found
    if (!donors || donors.length === 0) {
      return res.status(404).json({ message: 'No donors found' });
    }

    res.status(200).json(donors);
  } catch (error) {
    console.error("Error fetching top donors:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
