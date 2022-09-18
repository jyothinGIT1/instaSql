const bcryptjs = require("bcryptjs");

const hashPassword = async (candidatePassword) => {
  const salt = await bcryptjs.genSalt(10);
  candidatePassword = await bcryptjs.hash(candidatePassword, salt);
  return candidatePassword;
};

const comparePassword = async (canditatePassword, dbPassword) => {
  const isMatch = await bcryptjs.compare(canditatePassword, dbPassword);
  return isMatch;
};

module.exports = { hashPassword, comparePassword };
