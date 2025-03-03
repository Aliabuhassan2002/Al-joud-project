const express = require('express');
const router = express.Router();
const {
  getDonorContributions,
  manageBeneficiaryProfiles,
  generateReports,
  getBeneficiaries,
  getSingleBeneficiary,
  getSingleUser,
  getDonors,
  getSingleDonor,
  createUserAndBeneficiary,
  getContactUsMessages,   
} = require('../controllers/adminController');
const upload = require('../middlewares/uploadMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');


router.get('/donations', authenticate, authorize(['Admin']), getDonorContributions);
router.put('/beneficiaries/:id', manageBeneficiaryProfiles);
router.get('/reports', generateReports);
router.get('/beneficiaries', getBeneficiaries);
router.get('/donors', getDonors);
router.get('/donors/:id', getSingleDonor);
router.get('/beneficiaries/:id', getSingleBeneficiary);
router.post('/create', authenticate, authorize(['Admin']), upload.single('identity_image'), createUserAndBeneficiary);
router.get('/contact-us', authenticate, authorize(['Admin']), getContactUsMessages);

router.get('/users/:userId', getSingleUser);


router.get('/verify-admin', authenticate, (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: "Forbidden! You don't have permission." });
  }
  res.status(200).json({ role: req.user.role });
});

module.exports = router;
