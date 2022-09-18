const successResponse = (res, data = {}, msg = "success") => {
  return res.status(200).json({ msg, data });
};

module.exports = { successResponse };
