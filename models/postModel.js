// const Sequelize = require("sequelize");
const postSchema = (sequelize, Sequelize) => {
  const postSchema = sequelize.define(
    "postSchema",
    {
      postedUserId: {
        type: Sequelize.STRING,
      },
      filePath: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      postedOn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      // paranoid: true,
      timestamps: false,
      tableName: "postSchema",
    }
  );
  return postSchema;
};
module.exports = postSchema;
