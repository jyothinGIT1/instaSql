const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.dbName,
  process.env.SQLuserName,
  process.env.SQLpassword,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
global.sequelize = sequelize;
