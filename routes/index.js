const express = require("express");
const router = express.Router();
const userRoute = require("../modules/user/userRoute");
const postRoute = require("../modules/post/postRoute");
router.use("/user", userRoute);
router.use("/post", postRoute);

module.exports = router;
