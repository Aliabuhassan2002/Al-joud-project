const Beneficiary = require("../models/beneficiary");

const getAllAds = async (req, res) => {
  try {
    const ads = await Beneficiary.findAll({
      where: { user_id: req.params.id },
    });
    if (!ads || ads.length === 0) {
      console.log("There are no beneficiaries to show");
      return res.status(404).json({ message: "No beneficiaries found" });
    }
    res.status(200).json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving beneficiaries" });
  }
};

// const createBeneficiary = async (req, res) => {
//   try {
//     const user_id = req.user.id;
//     const { total_debt, reason, category } = req.body;

//     // Get the uploaded image URL from Cloudinary
//     const identity_image = req.file ? req.file.path : null;

//     const beneficiary = await Beneficiary.create({
//       user_id,
//       total_debt,
//       remaining_debt: total_debt, // Always equal to total_debt
//       reason,
//       identity_image,
//       category,
//       verified: false,
//     });

//     res
//       .status(201)
//       .json({ message: "Beneficiary registered successfully", beneficiary });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error creating beneficiary" });
//   }
// };
const createBeneficiary = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Uploaded File:", req.file);

    const { debt_amount, debt_reason, category } = req.body;
    if (!debt_amount || !debt_reason || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path; // Multer يجب أن يكون مضبوطًا بشكل صحيح
    } else {
      return res.status(400).json({ message: "Identity image is required." });
    }

    const newBeneficiary = await Beneficiary.create({
      debt_amount,
      debt_reason,
      category,
      identity_image: imageUrl,
      user_id: req.user.id, // تأكد أن المستخدم مسجل الدخول
      verified: null,
    });

    return res.status(201).json({
      message: "Beneficiary registered successfully",
      beneficiary: newBeneficiary,
    });
  } catch (error) {
    console.error("Error in createBeneficiary:", error);
    return res.status(500).json({
      message: "Failed to register beneficiary.",
      error: error.message,
    });
  }
};

// const getDonationsByUserId = async (req,res) => {
//   try {

//     const donations = await Donation.findAll({
//       include: {
//         model: Donor,
//         attributes: [], // Exclude donor fields if not needed
//         where: { user_id: userId },
//       },
//     });

//     return donations;
//   } catch (error) {
//     console.error("Error fetching donations:", error);
//     throw error;
//   }
// };

// // Example usage
// const userId = 56; // Replace with actual user ID
// getDonationsByUserId(userId).then((donations) => {
//   console.log(donations);
// });

module.exports = { getAllAds, createBeneficiary };
