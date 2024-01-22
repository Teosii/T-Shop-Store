let sequelize = require("sequelize");
let databaza = new sequelize("tshopstore", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = databaza;
