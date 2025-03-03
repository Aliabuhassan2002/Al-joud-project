const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./user');

const Donor = sequelize.define('Donor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    total_donated: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
}, {
    tableName: 'donors',
    timestamps: false
});

module.exports = Donor;
