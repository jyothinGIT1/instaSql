const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    let userId = req.user.userId;
    req.filePath = {
      filePath: `/public/${`${userId}-${
        file.originalname
      }-${Date.now()}.${ext}`}`,
    };
    cb(null, `user-${file.originalname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  // filter fn used check if the uploaded file is a image and pass error to the call back fn accordingly
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("uploaded a non image type file", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
const multerMiddleware = upload.single("photo");
module.exports = { multerMiddleware };
