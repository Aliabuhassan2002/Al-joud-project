const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const ContactUs = sequelize.define('ContactUs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'contact_us',
    timestamps: false
});

module.exports = ContactUs;
