const dotenv = require("dotenv");

//initialize sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.SQLdbName,
  process.env.SQLuserName,
  process.env.SQLpassword,
  {
    host: process.env.SQLhost,
    dialect: "mysql",
    logging: false,
    benchmark: true,
    // operatorsAliases: false,
    pool: {
      max: 5, //max no.of connection
      min: 0, //min no,of connection
      acquire: 50000, //max time in ms to get connection
      idle: 10000, //max time in ms for a connection to be idle
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.books = require("./model.js")(sequelize, Sequelize);

module.exports = db;

// module.exports = {
//   //configuration for mysql
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "root",
//   DB: "instagramSql",
//   dialect: "mysql",
//   //optional configuration for sequelize
//   pool: {
//     max: 5, //max no.of connection
//     min: 0, //min no,of connection
//     acquire: 50000, //max time in ms to get connection
//     idle: 10000, //max time in ms for a connection to be idle
//   },
// };

// const con = mysql.createConnection(
//   {
//     host: "localhost",
//     user: "root",
//     password: "root",
//     // DB: "instagramSql",
//     // dialect: "mysql2",
//   }
//   {
//     pool: {
//       max: 5, //max no.of connection
//       min: 0, //min no,of connection
//       acquire: 50000, //max time in ms to get connection
//       idle: 10000, //max time in ms for a connection to be idle
//     },
//   }
// );

// const mysql = require("mysql2");
// const con = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "123456",
//   DB: "testdb",
//   dialect: "mysql",
//   //optional configuration for sequelize
//   pool: {
//     max: 5, //max no.of connection
//     min: 0, //min no,of connection
//     acquire: 50000, //max time in ms to get connection
//     idle: 10000, //max time in ms for a connection to be idle
//   },
// };

// module.exports = { con };
