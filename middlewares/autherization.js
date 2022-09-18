const { verifyJWT } = require("../utils/token");

const autherizationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("No token provided");
    }
    const token = authHeader.split(" ")[1];
    const { userId, name } = verifyJWT(token);
    req.user = { userId, name }; // attached the user object with req obj
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { autherizationMiddleware };
