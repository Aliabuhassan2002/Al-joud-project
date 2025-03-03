const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Donor = require("./donor");
const Beneficiary = require("./beneficiary");

const Donation = sequelize.define(
  "Donation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Donor,
        key: "id",
      },
    },
    debtor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Beneficiary,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Paypal",
      validate: {
        isIn: [["Paypal"]],
      },
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Pending",
      validate: {
        isIn: [["Completed", "Pending", "Failed"]],
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "donations",
    timestamps: false,
  }
);

module.exports = Donation;
