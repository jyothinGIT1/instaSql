const model = require("../models");
const commentPostSchema = (sequelize, Sequelize) => {
  const commentPost = sequelize.define(
    "commentPost",
    {
      commentedUserId: {
        type: Sequelize.STRING,
      },
      postId: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
        default: "",
      },
      commentedOn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      // paranoid: true,
      timestamps: false,
      tableName: "commentPost",
      // associate: function (model) {
      //   commentPost.belongsTo(model.user, { foreignKey: { unique: true } });
      // },
    }
  );
  return commentPost;
};
module.exports = commentPostSchema;
