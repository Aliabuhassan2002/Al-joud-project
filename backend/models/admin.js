const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./user');

const Admin = sequelize.define('Admin', {
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
    }
}, {
    tableName: 'admins',
    timestamps: false
});

module.exports = Admin;
