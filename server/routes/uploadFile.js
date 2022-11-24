const uuid = require("uuid").v4;
const multer = require("multer");
const express = require("express");
const getDateTimeForFileName = require("../functions/helpers");

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const { originalname } = file;
    callback(null, `${uuid()}-${getDateTimeForFileName()}-${originalname}`);
  },
});

const upload = multer({ storage });

uploadRouter.route("/upload").post(upload.single("uploadFile"), (req, res) => {
  if (req.file === undefined) {
    res.send({
      status: 204,
    });
  }

  const filePath = req.file.path;

  res.send({
    status: 200,
    filePath: filePath.replace("uploads/", "http://localhost:5001/"),
  });
});

module.exports = uploadRouter;
