const userFollowerModel = (sequelize, Sequelize) => {
  const followerSchema = sequelize.define(
    "userFollowerSchema",
    {
      followerId: {
        type: Sequelize.INTEGER,
        // foreignKey: true,
      },
      followingId: {
        // foreignKey: true,
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: "userFollowerSchema",
    }
  );
  return followerSchema;
};
module.exports = userFollowerModel;
