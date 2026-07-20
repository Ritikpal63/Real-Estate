const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Contact = sequelize.define(
  "Contact",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
  },
  { tableName: "contacts", timestamps: true, createdAt: "created_at", updatedAt: false }
);

module.exports = Contact;