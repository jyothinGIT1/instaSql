const model = require("../../models");
const { verifyJWT } = require("../../utils/token");

const createPost = async (userId, data) => {
  const postData = { postedUserId: userId, ...data };
  const response = await model.postSchema.create(postData);
  return 1;
  // const { postId, filePath, description, postedUserId, postedOn } =
  //   await model.postSchema.create(postData);

  // return { postId , filePath, description, postedUserId, postedOn };
};
const commentPost = async (userId, data) => {
  const postData = { commentedUserId: userId, ...data };
  const postCommentResponse = await model.commentPostSchema.create(postData);
  // const { commentedUserId, comment, id } = postCommentResponse;
  // console.log({ commentedUserId, comment, id });
  return 1;
};
const likePost = async (userId, data) => {
  const postData = { likedUserId: userId, ...data };
  const postCommentResponse = await model.likePost.create(postData);
  const { id, postId, likedUserId } = postCommentResponse;
  return {
    postId,
    likedUserId,
    likeId: id,
  };
};
const getPost = async (userId, limit, offset) => {
  const getPost = await model.postSchema.findAll({
    offset: (offset - 1) * 1 || 0,
    limit: limit * 1 || 100,
    where: { postedUserId: userId },
    include: [
      {
        model: model.likePost,
        group: "postId",
        attributes: [[sequelize.fn("COUNT", sequelize.col("postId")), "count"]],
        separate: true,
      },
      {
        model: model.commentPostSchema,
        attributes: [[sequelize.fn("COUNT", sequelize.col("postId")), "count"]],

        group: "postId",
        separate: true,
      },
    ],
  });
  return getPost;
};

const getComment = async (limit, offset, postId) => {
  const commentResponse = await model.commentPostSchema.findAll({
    offset: (offset - 1) * limit || 0,
    limit: limit * 1 || 100,
    where: { postId: postId * 1 },
    include: { model: model.user, attributes: ["name"] },
  });
  return commentResponse;
};

const deletePost = async (postId) => {
  const commentResponse = await model.postSchema.destroy({
    where: { postId: postId * 1 },
  });
  return commentResponse;
};

module.exports = {
  getComment,
  createPost,
  getPost,
  commentPost,
  likePost,
  deletePost,
};
