const express = require("express");
// const jsonServer = require("json-server");
// const { v4: uuidv4 } = require("uuid");
//const db = require("../models");
const routerGetData = express.Router();
const dbGetData = require("../controllers/dbGetData");

// const testUrl = (req, res) => {
//   const status = 200;
//   const message = req.url;
//   //console.log(req);
//   // console.log(message);
//   //   console.log("HEADERS=" + req.headers["content-type"]);
//   //console.log("BODYS=" + req.body);
//   //console.log("URL=" + req.url);

//   res.writeHead(status, { "Content-Type": "text/html" });
//   res.write(message);
//   res.end();
// };
//unDeleteNews

routerGetData.post("/reg", dbGetData.regUsers); //fix for TA

routerGetData.get("/get/lotto", dbGetData.getLottoData);

routerGetData.get("/reset/news", dbGetData.unDeleteNews);
routerGetData.get("/clear/news", dbGetData.clearNews);

routerGetData.get("/clear/users", dbGetData.destroyUsers);
routerGetData.get("/add/users", dbGetData.createUsers);
routerGetData.get("/get/users", dbGetData.getUserList);
routerGetData.get("/reset/group", dbGetData.clearGroup, dbGetData.createGroup);
routerGetData.get("/get/group", dbGetData.getGroupList);
routerGetData.get("/news-data", dbGetData.getNewsListData);

// routerGetData.get("/lotto2db", dbGetData.lotto2db);

routerGetData.get("/", (req, res) => {
  if (req) {
  }
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });
  res.end("404 File not found!");
});

// routerGetData.get(
//   "/err",
//   (req, res, cb) => {
//     console.log("Err Callback");
//     return cb("err cb");
//   },
//   testUrl
// );

// routerGetData.get(
//   "/test",
//   (req, res, cb) => {
//     console.log("Callback");

//     cb();
//   },
//   (req, res) => res.status(200).send("result")
// );

// // Read
// router.get("/", todoControllers.getTodoList);
// router.get("/:id", todoControllers.getTodoItem);

// // Update
// router.put("/:id", todoControllers.updateTodoItem);

// // DELETE
// router.delete("/:id", todoControllers.deleteTodoItem);

routerGetData.get(
  "/bananas",
  function (req, res, next) {
    getMember(function (err, member) {
      if (err) return next(err);
      // If there's no member, don't try to look
      // up data. Just go render the page now.
      if (!member) return next("route");
      // Otherwise, call the next middleware and fetch
      // the member's data.
      req.member = member;
      next();
    });
  },
  function (req, res, next) {
    getMemberData(req.member, function (err, data) {
      if (err) return next(err);
      // If this member has no data, don't bother
      // parsing it. Just go render the page now.
      if (!data) return next("route");
      // Otherwise, call the next middleware and parse
      // the member's data. THEN render the page.
      req.member.data = data;
      next();
    });
  },
  function (req, res, next) {
    req.member.parsedData = parseMemberData(req.member.data);
    next();
  }
);

// routerGetData.get("/bananas", function (req, res, next) {
//   renderBananas(req.member);
// });

module.exports = routerGetData;
