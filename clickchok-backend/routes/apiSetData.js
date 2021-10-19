const express = require("express");
// const jsonServer = require("json-server");
// const { v4: uuidv4 } = require("uuid");
//const db = require("../models");
const routerSetData = express.Router();
const dbSetData = require("../controllers/dbSetData");
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const PATH = "./public/uploads/news/";
// console.log(PATH);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req || file) {
      // console.log(req.body, file);
    }
    // console.log("PATH", PATH);
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    if (req) {
      // console.log(req.body);
    }

    // const fileNameOld = file.originalname.toLowerCase().split(" ").join("-");
    const fileNameOld =
      file.originalname.toLowerCase().length === 54
        ? file.originalname.toLowerCase()
        : null;
    const fileName = fileNameOld || Date.now() + "_" + v4() + ".jpg";
    // const fileName = Date.now() + "_" + v4() + ".jpg";
    console.log("fileName Line034", fileName);
    cb(null, fileName);
  },
});

const upload = multer({
  // dest: __dirname + "./public/uploads/",
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter: (req, file, cb) => {
    if (req) {
    }
    // console.log(file.path);
    // console.log(file.mimetype);
    if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      // console.log(file.mimetype);
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only .jpg and .jpeg"));
    }
  },
  onFileSizeLimit: function (file) {
    fs.unlinkSync("./" + file.path);
  },
});

const testUrl = (req, res) => {
  const status = 200;
  const message = req.url;

  res.writeHead(status, { "Content-Type": "text/html" });
  res.write(message);
  res.end();
};
// Create
// routerSetData.get("/test", testUrl);

routerSetData.get("/group", dbSetData.getGroupList);
routerSetData.get("/group/:id", dbSetData.getGroupById);
routerSetData.post("/group", dbSetData.genGroupCode, dbSetData.createGroup);
routerSetData.patch("/group/:id", dbSetData.updateGroup);
routerSetData.delete("/group/:id", dbSetData.deleteGroup);

routerSetData.get("/news", dbSetData.getNewsList);
routerSetData.get("/news-data", dbSetData.getNewsListData);
routerSetData.get("/news/:id", dbSetData.getNewsById);
routerSetData.post("/news", upload.single("newsImage"), dbSetData.createNews);
routerSetData.patch("/news", dbSetData.deleteNewsList);

routerSetData.delete("/news", dbSetData.removeNewsList); //fix for TA [array]
routerSetData.delete("/news/:id", dbSetData.removeNewsItem); //fix for TA [int]

routerSetData.patch(
  "/news/:id",
  upload.single("newsImage"),
  dbSetData.updateNews
);

routerSetData.get("/", (req, res) => {
  if (req) {
  }
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });
  res.end("404 File not found!");
});

module.exports = routerSetData;
