const userSchema = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      mobileNumber: { type: Sequelize.BIGINT(1), allowNull: false },
      photo: { type: Sequelize.STRING, allowNull: true },
      DOB: { type: Sequelize.STRING, allowNull: false },
      createdOn: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    },
    {
      // paranoid: true,
      timestamps: false,
      tableName: "users",
    }
  );
  return user;
};
module.exports = userSchema;
