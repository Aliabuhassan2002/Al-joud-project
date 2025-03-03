const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Beneficiary = require('./beneficiary');

const VerificationRequest = sequelize.define('VerificationRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    debtor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Beneficiary,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['Pending', 'Approved', 'Rejected']]
        }
    },
    reviewed_at: {
        type: DataTypes.DATE
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'verification_requests',
    timestamps: false
});

module.exports = VerificationRequest;
