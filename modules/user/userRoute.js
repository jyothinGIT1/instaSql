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
  followings1,
  followers1,
  deleteUser,
} = require("./userController");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/:id/follow", autherizationMiddleware, followUser);
route.patch("/edit", autherizationMiddleware, multerMiddleware, edit);
route.get("/get", autherizationMiddleware, getUser);
route.get("/followers", autherizationMiddleware, followers);
route.get("/following", autherizationMiddleware, following);
route.delete("/delete", autherizationMiddleware, deleteUser);

route.get("/followings1", autherizationMiddleware, followings1);
route.get("/followers1", autherizationMiddleware, followers1);

module.exports = route;
