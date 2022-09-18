//basic route dependencies
require("dotenv").config();
// require("express-async-errors");
require("./utils/connectDB");
const Sequelize = require("sequelize");

const express = require("express");
const cors = require("cors");
const conncetDB = require("./utils/connectDB");
const indexroute = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();

app.use(express.json());
app.use(cors());

app.use(indexroute);
app.use(errorHandler);
// const { con } = require("./config/config");
const db = require("./models");
const port = process.env.PORT || 4000;

db.sequelize
  .sync({ alter: true }) // creates an updated table on existing tables in the DB
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`server listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync db: " + err.message);
  });
