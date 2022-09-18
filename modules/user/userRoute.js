const express = require("express");
const multer = require("multer");
const { autherizationMiddleware } = require("../../middlewares/autherization");
const { multerMiddleware } = require("../../middlewares/multer");
const {
  register,
  edit,
  login,
  getUser,
  followUser,
  followers,
  following,
} = require("./userController");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/:id/follow", autherizationMiddleware, followUser);
route.patch("/edit", autherizationMiddleware, multerMiddleware, edit);
route.get("/get", autherizationMiddleware, getUser);
route.get("/followers", autherizationMiddleware, followers);
route.get("/following", autherizationMiddleware, following);

module.exports = route;
