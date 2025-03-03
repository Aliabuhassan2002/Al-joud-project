const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Beneficiary = sequelize.define(
  "Beneficiary",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    total_debt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    remaining_debt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    identity_image: {
      type: DataTypes.STRING(255),
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isIn: [
          [
            "فك كربة السجناء",
            "مساعدة المرضى",
            "سداد ديون الأسر المحتاجة",
            "سداد ديون التعليم",
          ],
        ],
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "beneficiary",
    timestamps: false,
  }
);

module.exports = Beneficiary;
