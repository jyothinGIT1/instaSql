const userFollowerModel = (sequelize, Sequelize) => {
  const followerSchema = sequelize.define(
    "userFollowerSchema",
    {
      followerId: {
        type: Sequelize.STRING,
      },
      followingId: {
        type: Sequelize.STRING,
      },
    },
    {
      // paranoid: true,
      timestamps: false,
      tableName: "userFollowerSchema",
    }
  );
  return followerSchema;
};
module.exports = userFollowerModel;
