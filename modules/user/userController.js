const userService = require("./userService");
const { successResponse } = require("../../helper/successResponse");

const register = async (req, res, next) => {
  try {
    const userRegResponse = await userService.register(req.body);
    return successResponse(res, (data = userRegResponse));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginResponse = await userService.login({ email, password });
    if (loginResponse) {
      return successResponse(res, (data = { token: loginResponse }));
    } else {
      return successResponse(res, (data = "Invalid Login credentials"));
    }
  } catch (err) {
    next(err);
  }
};
const followUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    followingId = req.params.id;
    const postData = { followingId };
    const commentResponse = await userService.followUser(userId, postData);
    return successResponse(res, (data = { response: commentResponse }));
  } catch (error) {
    next(error);
  }
};
const edit = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const photo = req.filePath.filePath;
    const postData = { ...req.body, photo };
    const editResponse = await userService.edit(userId, postData);
    return successResponse(res, (data = { response: editResponse }));
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const getUserResponse = await userService.getUser(userId);
    return successResponse(res, (data = { response: getUserResponse }));
  } catch (error) {
    next(error);
  }
};
const followers = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const followersResponse = await userService.followers(userId);
    return successResponse(res, (data = { response: followersResponse }));
  } catch (error) {}
};
const following = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const followersResponse = await userService.following(userId);
    return successResponse(res, (data = { response: followersResponse }));
  } catch (error) {}
};
module.exports = {
  register,
  edit,
  login,
  getUser,
  followUser,
  followers,
  following,
};
