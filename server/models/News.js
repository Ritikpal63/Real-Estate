const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const News = sequelize.define(
  "News",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: true },
    category: { type: DataTypes.STRING, defaultValue: "General" },
    image: { type: DataTypes.STRING, allowNull: true },
    author: { type: DataTypes.STRING, defaultValue: "Admin" },
  },
  { tableName: "news", timestamps: true, createdAt: "created_at", updatedAt: false }
);

module.exports = News;