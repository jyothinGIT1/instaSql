const likePost = (sequelize, Sequelize) => {
  const likePost = sequelize.define(
    "likePost",
    {
      likedUserId: {
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
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
