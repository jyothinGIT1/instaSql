const model = require("../../models");
const { verifyJWT } = require("../../utils/token");

const createPost = async (userId, data) => {
  const postData = { postedUserId: userId, ...data };
  const { id, filePath, description, postedUserId, postedOn } =
    await model.postSchema.create(postData);
  return { postId: id, filePath, description, postedUserId, postedOn };
};
const commentPost = async (userId, data) => {
  const postData = { commentedUserId: userId, ...data };
  const postCommentResponse = await model.commentPostSchema.create(postData);
  const { commentedUserId, comment, id } = postCommentResponse;
  return {
    commentedUserId: commentedUserId,
    comment,
    commentId: id,
  };
};
const likePost = async (userId, data) => {
  const postData = { userId, ...data };
  const postCommentResponse = await model.likePost.create(postData);
  const { id, postId, likedUserId } = postCommentResponse;
  return {
    postId,
    likedUserId,
    likeId: id,
  };
};

const getPost = async (userId, limit, offset) => {
  let postCommentResponse = await model.postSchema.findAll({
    offset: offset * 1 || 1,
    limit: limit * 1 || 100,
    where: { postedUserId: userId },
  });
  let CommentResponse = [];
  postCommentResponse.forEach((element) => {
    CommentResponse.push({
      postId: element["dataValues"].id,
      filePath: element["dataValues"].filePath,
      description: element["dataValues"].description,
      postedOn: element["dataValues"].postedOn,
    });
  });
  postCommentResponse = CommentResponse;
  for (object of postCommentResponse) {
    let postId = object.postId;
    const count = await model.likePost.findAll({
      where: { postId },
      attributes: {
        include: [[sequelize.fn("COUNT", sequelize.col("postId")), "count"]],
      },
    });
    object["likes"] = count[0]["dataValues"].count;
    const commentResponse = await model.commentPostSchema.findAll({
      where: { postId: object.postId },
    });
    if (commentResponse.length === 0) {
      object["comments"] = 0;
    } else {
    }
  }

  for (object of postCommentResponse) {
    let postId = object.postId;
    const commentResponse = await model.commentPostSchema.findAll({
      where: { postId },
    });
    if (commentResponse.length === 0) {
      object["comments"] = 0;
    } else {
      const x = await model.user.findOne({
        where: {
          userId: commentResponse[0]["_previousDataValues"].commentedUserId,
        },
      });
      commentResponse[0]["commmentedBy"] = x["name"];
      const { commentedUserId, commmentedBy, comment, postId, commentedOn } =
        commentResponse[0];

      object["comments"] = {
        commentedUserId,
        commmentedBy,
        comment,
        postId,
        commentedOn,
      };
    }
  }
  if (postCommentResponse.length === 0) {
    return 0;
  }

  return postCommentResponse;
};
module.exports = { createPost, getPost, commentPost, likePost };
