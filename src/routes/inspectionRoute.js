const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {createInsp,createAreaMaster,sendEmail,} = require("../controller/inspectionController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).any("image_path");

const uploadStorage = upload;
router.post("/addItem", createInsp);
router.post("/addCustomItem", createAreaMaster);
router.post("/sendEmail", uploadStorage, sendEmail);

module.exports = router;
