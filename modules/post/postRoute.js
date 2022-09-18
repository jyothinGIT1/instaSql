const express = require("express");
const { autherizationMiddleware } = require("../../middlewares/autherization");
const { multerMiddleware } = require("../../middlewares/multer");
const {
  createPost,
  getPost,
  commentPost,
  likePost,
  getComment,
} = require("./postController");
const route = express.Router();

route.post("/create", autherizationMiddleware, multerMiddleware, createPost);
route.get("/getPost", autherizationMiddleware, getPost);
route.post("/:id/comment", autherizationMiddleware, commentPost);
route.post("/:id/like", autherizationMiddleware, likePost);
route.get("/:postId/getComment", autherizationMiddleware, getComment);

module.exports = route;
