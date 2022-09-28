const model = require("../../models");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { createJWT } = require("../../utils/token");

const register = async (data) => {
  data.password = await hashPassword(data.password);
  const { userId, name, email, photo, mobileNumber, DOB, createdOn } =
    await model.user.create(data);
  return {
    userId,
    name,
    email,
    photo,
    mobileNumber,
    DOB,
    createdOn,
  };
};

const login = async (data) => {
  const userDataResponse = await model.user.findOne({
    where: { email: data.email },
  });
  if (!userDataResponse) {
    throw new Error("Email doesn't exist in DB");
  }
  const isValid = await comparePassword(
    data.password,
    userDataResponse.password
  );
  if (isValid) {
    const payload = {
      userId: userDataResponse.userId,
      name: userDataResponse.name,
    };
    const jwt = createJWT(payload);
    return jwt;
  }
};

const followUser = async (userId, data) => {
  const postData = { followerId: userId, followingId: data.followingId };
  const postCommentResponse = await model.userFollowerModel.create(postData);
  // let { followerId, followingId } = postCommentResponse["dataValues"];
  // console.log({ followerId, followingId });
  return 1;
};

const edit = async (userid, postData) => {
  const filter = { userId: userid };
  const update = postData;
  const { userId, name, email, photo, mobileNumber, DOB, createdOn } =
    await model.user.update(update, { where: filter }, { new: true });
  // console.log({ userId, name, email, photo, mobileNumber, DOB, createdOn });
  return 1;
};

const getUser = async (userId) => {
  const userResponse = await model.user.findOne({
    where: { userId: userId },
    attributes: { exclude: ["password"] },
  });
  let response = await model.userFollowerModel.findAll({
    where: { followerId: userId },
    attributes: {
      include: [[sequelize.fn("COUNT", sequelize.col("followerId")), "count"]],
    },
  });
  if (response[0]["dataValues"].count) {
    userResponse["dataValues"]["following"] = response[0]["dataValues"].count;
  } else {
    userResponse["dataValues"]["following"] = 0;
  }
  response = await model.userFollowerModel.findAll({
    where: { followingId: userId },
    attributes: {
      include: [[sequelize.fn("COUNT", sequelize.col("followingId")), "count"]],
    },
  });
  if (response[0]["dataValues"].count) {
    userResponse["dataValues"]["followers"] = response[0]["dataValues"].count;
  } else {
    userResponse["dataValues"]["followers"] = 0;
  }
  response = await model.postSchema.findAll({
    where: { postedUserId: userId },
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("postedUserId")), "count"],
      ],
    },
  });
  if (response[0]["dataValues"].count) {
    userResponse["dataValues"]["Posts"] = response[0]["dataValues"].count;
  } else {
    userResponse["dataValues"]["Posts"] = 0;
  }
  return userResponse;
};

const followers = async (userId) => {
  const follower = await model.userFollowerModel.findAll({
    where: { followingId: userId },
  });
  let followerList = [];
  follower.forEach((element) => {
    followerList.push(element["dataValues"].followerId);
  });
  const response = await model.user.findAll({
    where: {
      userId: followerList,
    },
  });
  followerList = [];
  response.forEach((element) => {
    followerList.push({
      followerId: element["dataValues"].userId,
      name: element["dataValues"].name,
    });
  });
  if (followerList.length === 0) {
    return 0;
  }
  return followerList;
};

const following = async (userId) => {
  const followings = await model.userFollowerModel.findAll({
    where: { followerId: userId },
  });

  let followingList = [];
  followings.forEach((element) => {
    followingList.push(element["dataValues"].followingId);
  });
  const response = await model.user.findAll({
    where: {
      userId: followingList,
    },
  });
  followingList = [];
  response.forEach((element) => {
    followingList.push({
      followingId: element["dataValues"].userId,
      name: element["dataValues"].name,
    });
  });
  if (followingList.length === 0) {
    return 0;
  }
  return followingList;
};

const followings1 = async (userId) => {
  const followings = await model.userFollowerModel.findAll({
    where: { followerId: userId },
    attributes: ["followingId"],
    include: { model: model.user, attributes: ["name"], as: "following" },
  });
  if (followings.length === 0) {
    return 0;
  }
  return followings;
};
const followers1 = async (userId) => {
  const followings = await model.userFollowerModel.findAll({
    where: { followingId: userId },
    attributes: ["followerId"],
    include: { model: model.user, attributes: ["name"], as: "follower" },
  });
  if (followings.length === 0) {
    return 0;
  }
  return followings;
};
const deleteUser = async (userId) => {
  const followings = await model.user.destroy({
    where: { userId },
  });
  return followings;
};
module.exports = {
  register,
  edit,
  login,
  getUser,
  followUser,
  followers,
  following,
  followings1,
  followers1,
  deleteUser,
};
