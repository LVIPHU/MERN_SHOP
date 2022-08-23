const path = require("path");
const express = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const config = require("../config/index")
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, config.uploadImagePath);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/upload", upload.single("image"), (req, res) => {
  cloudinary.v2.uploader.upload(
    req.file.path,
    { folder: "products" },
    async (err, result) => {
      if (err) console.log(err);
      res.json({ public_id: result.public_id, url: result.url, path: req.file.path });
    }
  );
});

router.post("/destroy",(req, res) => {
  try {
    const { public_id, path } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images Selected", info: false });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) console.log(err);
    fs.unlinkSync(path);
    res.json({ msg: "Deleted Image", info: true });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message, info: false });
  }
});

router.post("/descripion", upload.single("image"), (req, res) => {
  cloudinary.v2.uploader.upload(
    req.file.path,
    { folder: "descripion" },
    async (err, result) => {
      if (err) console.log(err);
      res.send(`![image](${result.url})`);
    }
  );
});

module.exports = router;
