const likePost = (sequelize, Sequelize) => {
  const likePost = sequelize.define(
    "likePost",
    {
      likedUserId: {
        type: Sequelize.STRING,
      },
      postId: {
        type: Sequelize.STRING,
      },
    },
    {
      // paranoid: true,
      timestamps: false,
      tableName: "likePost",
    }
  );
  return likePost;
};
module.exports = likePost;
