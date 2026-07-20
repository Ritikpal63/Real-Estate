const sequelize = require("../config/sequelize");
const Contact = require("./Contact");
const News = require("./News");
// const User = require("./User");

module.exports = { sequelize, Contact, News };