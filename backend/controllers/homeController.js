const Beneficiary = require('../models/beneficiary');

// Get all users
exports.getBeneficiaries = async (req, res) => {
    try {
        console.log("Fetching all beneficiaries...");
        const beneficiaries = await Beneficiary.findAll();  
        console.log("Fetched beneficiaries:", beneficiaries);
        res.status(200).json(beneficiaries);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error.message);
        console.error(error.stack); 
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};