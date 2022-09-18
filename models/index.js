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
    // operatorsAliases: false
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
db.user = require("./userModel.js")(sequelize, Sequelize);
db.userFollowerModel = require("./userFollowerModel.js")(sequelize, Sequelize);
db.postSchema = require("./postModel.js")(sequelize, Sequelize);
db.likePost = require("./likePost.js")(sequelize, Sequelize);
db.commentPostSchema = require("./commentPost.js")(sequelize, Sequelize);

module.exports = db;
