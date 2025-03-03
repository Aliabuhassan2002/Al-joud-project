const User = require('./user');
const Beneficiary = require('./beneficiary');
const ContactUs = require('./contactUs');
const VerificationRequest = require('./verificationRequest');
const Admin = require('./admin');
const Donation = require('./donation');
const Donor = require('./donor');

// Associations
User.hasOne(Beneficiary, { foreignKey: 'user_id' });
Beneficiary.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Donor, { foreignKey: 'user_id' });
Donor.belongsTo(User, { foreignKey: 'user_id' });

Beneficiary.hasMany(VerificationRequest, { foreignKey: 'debtor_id' });
VerificationRequest.belongsTo(Beneficiary, { foreignKey: 'debtor_id' });

User.hasOne(Admin, { foreignKey: 'user_id' });
Admin.belongsTo(User, { foreignKey: 'user_id' });

// Donation Associations:
Beneficiary.hasMany(Donation, { foreignKey: 'debtor_id' });
Donor.hasMany(Donation, { foreignKey: 'donor_id' });

Donation.belongsTo(Beneficiary, { foreignKey: 'debtor_id' });
Donation.belongsTo(Donor, { foreignKey: 'donor_id' });

module.exports = {
    User,
    Beneficiary,
    ContactUs,
    VerificationRequest,
    Admin,
    Donation,
    Donor
};
