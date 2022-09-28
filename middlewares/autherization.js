const { verifyJWT } = require("../utils/token");
const model = require("../models");

const autherizationMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("No token provided");
    }
    const token = authHeader.split(" ")[1];
    const { userId, name } = verifyJWT(token);
    const response = await model.user.findOne({
      where: { userId },
      attributes: ["isBlocked"],
    });
    if (response.dataValues.isBlocked) {
      throw new Error("You are blocked. You cannot access our services");
    }
    req.user = { userId, name }; // attached the user object with req obj
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { autherizationMiddleware };
