const db = require("./models");
const getRoutes = require("./routes/apiGetData");
const setRoutes = require("./routes/apiSetData");
const { checkUserAcc } = require("./controllers/dbGetData");
// const { createNews } = require("./controllers/dbSetData");

const { v4 } = require("uuid");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
// const jsonServer = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// const { uuid } = require("uuidv4");
const crypto = require("crypto");
//creating hash object
const hash = crypto.createHash("sha256");
//passing the data to be hashed
// const data = hash.update("uploadImage", "utf-8");
//Creating the hash in the required format
// const gen_hash = data.digest("hex");
//Printing the output on the console
// console.log("hash : " + gen_hash);
// let imageTitle = Date.now();

const PATH = "./public/uploads/news/";
//console.log(PATH);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req || file) {
    }
    // console.log("PATH", PATH);
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    if (req) {
    }

    // const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const fileName = Date.now() + "_" + v4() + ".jpg";
    // const data = hash.update(file.originalname, "utf-8");
    // const gen_hash = data.digest("hex");
    // const fileName =
    //   Date.now() +
    //   "_" +
    //   Buffer.from(file.originalname).toString("hex") +
    //   ".jpg";
    // console.log(fileName, file.originalname, file.fieldname);
    // console.log(Object.keys(file));
    // console.log(file.path);
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
//const express = require("express");
// var fileUpload= require('express-fileupload');

const server = jsonServer.create();
// const router = jsonServer.router("./database.json");
// const middlewaresOptions = { static: "uploads/news" };

// const static = jsonServer.defaults(middlewaresOptions);
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
server.use(cors());

// server.use(jsonServer.static("./public"));
// server.use("/uploads", express.static("uploads"));
// server.use(
//   multer({
//     dest: __dirname + "./public/uploads/",
//     limits: {
//       fileSize: 1024 * 1024 * 100,
//     },
//     onFileSizeLimit: function (file) {
//       fs.unlinkSync("./" + file.path);
//     },
//   }).array("files")
// );
server.use(bodyParser.json({ limit: "5mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());
// const pathStatic = path.join(__dirname, "public");
// server.use(jsonServer.defaults({ static: path.join(__dirname, "public") }));
server.use(jsonServer.defaults());
// console.log("path", path.join(pathStatic, "uploads"));
const SECRET_KEY = "123456789";
const REFRESH_SECRET_KEY = "0123456789";
const mapToken = new Map();
// const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = {SECRET_KEY , REFRESH_SECRET_KEY} ||process.env;

const expiresInAccess = "1h";
//"1h"
const expiresInRefresh = "8h";

// const currentPath = path.join(__dirname, "public", "car.png");
// const destinationPath = path.join(__dirname, "images", "car.png");

// fs.rename(currentPath, destinationPath, function (err) {
//     if (err) {
//         throw err
//     } else {
//         console.log("Successfully moved the file!");
//     }
// });

// fs.readFile('readMe.txt', 'utf8', function (err, data) {
//   fs.writeFile('writeMe.txt', data, function(err, result) {
//      if(err) console.log('error', err);
//    });
//  });

// fs.writeFileSync and fs.writeFile
// path.exists('foo.txt', function(exists) {
//   if (exists) {
//     // do something
//   }
// });

// if (path.existsSync('foo.txt')) {
//   // do something
// }

const testUrl = (req, res) => {
  const status = 200;
  const message = req.url + " " + req.headers["content-type"];
  //console.log(req);
  //console.log(message);
  //console.log("HEADERS=" + req.headers["content-type"]);
  //console.log("BODYS=" + req.body);
  //console.log("URL=" + req.url);

  res.writeHead(status, { "Content-Type": "text/html" });
  res.write(message);
  res.end();
};

function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: expiresInRefresh });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: expiresInAccess });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
// function isAuthenticated({ email, password }) {
//   return (
//     userdb.users.findIndex(
//       (user) => user.email === email && user.password === password
//     ) !== -1
//   );
// }

server.use("/api", getRoutes);

// console.log(Object.keys(static[2]));
// server.use(static);
// server.get("/uploads/news", jsonServer.static(path.join(__dirname, "public")));
// server.get("/uploads/news", jsonServer.static(path.join(__dirname, "public")));
// app.get("/", express.static(path.join(__dirname, "./public")));

server.post("/create-news22", upload.single("newsImage"), (req, res) => {
  console.log("post /upload");
  console.log("req keys");
  // console.log(Object.keys(req));
  // console.log("req.body keys");
  // console.log(Object.keys(req.body));
  // console.log(req.body.newsTitle);
  console.log("req.file", req.file);
  // console.log("req.file.path", req.file.path);
  // console.log("res.file.path", res.file.path);
  // console.log(Object.keys(req));
  // console.log(Object.keys(res));
  // console.log(req.body.newsTitle);
  testUrl(req, res);
  //res.status(status).json({ status, message });
});

// server.get("/auth/refresh_token", (req, res) => {
//   console.log("get /auth/refresh_token");
//   testUrl(req, res);
//   //res.status(status).json({ status, message });
// });

// server.get("/test", (req, res) => {
//   console.log("get /test");
//   testUrl(req, res);
//   //res.status(status).json({ status, message });
// });

// Register New User
// server.post("/auth/register", (req, res) => {
//   console.log("register endpoint called; request body:");
//   console.log(req.body);
//   const { email, password } = req.body;

//   if (isAuthenticated({ email, password }) === true) {
//     const status = 401;
//     const message = "Email and Password already exist";
//     res.status(status).json({ status, message });
//     return;
//   }

//   fs.readFile("./users.json", (err, data) => {
//     if (err) {
//       const status = 401;
//       const message = err;
//       res.status(status).json({ status, message });
//       return;
//     }

//     // Get current users data
//     var data = JSON.parse(data.toString());

//     // Get the id of last user
//     var last_item_id = data.users[data.users.length - 1].id;

//     //Add new user
//     data.users.push({ id: last_item_id + 1, email: email, password: password }); //add some data
//     var writeData = fs.writeFile(
//       "./users.json",
//       JSON.stringify(data),
//       (err, result) => {
//         // WRITE
//         if (err) {
//           const status = 401;
//           const message = err;
//           res.status(status).json({ status, message });
//           return;
//         }
//       }
//     );
//   });

//   // Create token for new user
//   const access_token = createToken({ email, password });
//   console.log("Access Token:" + access_token);
//   res.status(200).json({ access_token });
// });

server.post("/auth/refresh_token", (req, res) => {
  console.log("login endpoint called; request body:");
  // console.log("post /auth/refresh_token");
  // console.log(req.body);
  if (res && req) {
  }
  const { refresh } = req.body;
  // console.log(req.headers);
  // console.log("refresh", refresh);
  // console.log(req.body);
  try {
    let verifyTokenResult;

    if (!mapToken.has(refresh)) {
      const status = 401;
      const message = "mapToken : Access token not provided becase not match";
      // console.log("message:" + message);
      res.status(status).json({ status, message });
      return;
    }
    //console.log("verifyRefreshToken", verifyTokenResult);
    verifyTokenResult = verifyRefreshToken(refresh);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "verifyRefreshToken : Access token not provided";
      // console.log("message:" + message);
      res.status(status).json({ status, message });
      return;
    }

    console.log("verifyRefreshToken", verifyTokenResult);
    // console.log("payload", verifyTokenResult.payload);
    // const { email, password } = {
    //   email: "nilson@email.com",
    //   password: "nilson",
    // };
    const { email, password } = verifyTokenResult;
    const access_token = createToken({ email, password });
    //const refresh_token = createRefreshToken({ email, password });
    // console.log("Access Token:" + access_token);
    //console.log("Refresh Token:" + refresh_token);

    res.status(200).json({ access_token });
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

// Login to one of the users from ./users.json
server.post("/auth/login", checkUserAcc, checkUserAcc, (req, res) => {
  console.log("login endpoint called; request body:");
  // console.log(req.body);
  // console.log(res.isCorrectPassword);
  if (!req.isCorrectPassword) {
    const status = 401;
    const message = "Incorrect Data";
    res.status(status).json({ status, message });
    return;
  }

  // const status = 401
  // const message = 'Incorrect email or password'
  // res.status(status).json({status, message})
  // return
  // const { email, password } = req.body;
  // if (isAuthenticated({ email, password }) === false) {
  //   const status = 401;
  //   const message = "Incorrect email or password";
  //   res.status(status).json({ status, message });
  //   return;
  // }
  const { memberData } = req;
  // console.log(memberData);
  const access_token = createToken({ memberData });
  const refresh_token = createRefreshToken({ memberData });
  // console.log("Access refresh:", refresh);
  // console.log("ACCESS_TOKEN===" + access_token);
  // console.log("Refresh_TOKEN===" + refresh_token);
  //console.log("Refresh Token:" + refresh_token);
  if (refresh_token && access_token) {
    mapToken.set(refresh_token, access_token);
    res.status(200).json({ access_token, refresh_token });
    return;
  }
  // console.log("mapToken:", mapToken);
  // res.status(200).json({ access_token, refresh_token });
  // res.status(200).json({access_token})
  const status401 = 401;
  const messageErr = "Error in authorization format";
  res.status(status401).json({ status401, messageErr });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  //console.log(req.headers);
  //console.log("next()", next);
  // console.log(req.headers);
  // console.log(req.headers["x-auth-token"]);
  const authToken = req.headers["x-auth-token"];
  //req.headers.authorization.split(" ")[0]
  //console.log(req);
  if (authToken === undefined || authToken.split(" ")[0] !== "Bearer") {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(authToken.split(" ")[1]);

    // console.log("268 verifyTokenResult", verifyTokenResult);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    // console.log("next()", next);
    next(); // to => server.use(router);
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use("/backend", setRoutes);

// server.post("/api-test", upload.single("newsImage"), (req, res) => {
//   console.log("post /api-test");
//   console.log("req keys");
//   console.log(Object.keys(req));
//   console.log("req.body keys");
//   console.log(Object.keys(req.body));
//   console.log(req.body.newsImage);
//   console.log(req.body.newsTitle);
//   console.log("req.file.path", req.file.path);
//   console.log("res.file.path", res.file.path);

//   testUrl(req, res);
//   //res.status(status).json({ status, message });
// });

//server.use(router);

// server.use(function (req, res) {
//   if (req) {
//   }
//   res.writeHead(404, {
//     "Content-Type": "text/plain",
//   });
//   res.end("404 File not found!");
// });
// server.listen(8000, () => {
//   console.log("Run Auth API Server");
// });

db.sequelize.sync().then(() => {
  server.listen(8000, () => {
    console.log("Run Auth API Server");
  });
});
