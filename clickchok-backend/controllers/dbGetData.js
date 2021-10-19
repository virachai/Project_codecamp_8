const db = require("../models");
const { Op } = require("sequelize");
// const uniqid = require("uniqid");
const bcryptjs = require("bcryptjs");
// const request = require("request");
const csvtojson = require("csvtojson");
// const fs = require("fs");

// const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");

//uniqid()
//const { uniqueId } = require("lodash");

// var members = req.body.members;
// db.sequelize.transaction(function (t) {
//     var promises = []
//     for (var i = 0; i < members.length; i++) {
//         var newPromise = models.User.create({'firstname':members[i], 'email':members[i], 'pending':true}, {transaction: t});
//         promises.push(newPromise);
//     };
//     return Promise.all(promises).then(function(users) {
//         var userPromises = [];
//         for (var i = 0; i < users.length; i++) {
//             userPromises.push(users[i].addInvitations([group], {transaction: t});
//         }
//         return Promise.all(userPromises);
//     });
// }).then(function (result) {
//     console.log("YAY");
// }).catch(function (err) {
//     console.log("NO!!!");
//     return next(err);
// });
//destroy

// console.log(db.tbLotto);
const clearNews = (req, res, cb) => {
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  db.tbNewsGroups
    .destroy({ where: {}, truncate: true })
    .then((result) => {
      console.log(result);
      cb();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const clearGroup = (req, res, cb) => {
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  db.tbNewsGroups
    .destroy({ where: {}, truncate: true })
    .then((result) => {
      console.log(result);
      cb();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const destroyUsers = (req, res) => {
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  // console.log(db);
  // console.log("TbUsers", db.tbUsers);
  // console.log("tb_users", db["tb_users"]);
  // res.status(400).send("err");
  // return;
  //res.status(201).send('createTodoItem');
  // const task = req.body.task;
  db.tbUsers
    .destroy({ where: {}, truncate: true })
    .then((result) => {
      const status = 200;
      const message = req.url;
      console.log("destroy", result);
      // res.writeHead(status, { "Content-Type": "text/html" });
      res.status(201).send(`${message} ${result}`);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// const loginUser = async (req, res) => {
//   const { username, password } = req.body;
//   const targetUser = await db.RealUsers.findOne({
//     where: { username: username },
//   });
//   if (!targetUser) {
//     res.status(400).send({ message: "Username or Password is wrong" });
//   } else {
//     const isCorrectPassword = bcryptjs.compareSync(
//       password,
//       targetUser.password
//     );
//     if (isCorrectPassword) {
//       const payload = {
//         name: targetUser.username,
//         id: targetUser.id,
//         hashtag: targetUser.hashtag,
//       };
//       const token = jwt.sign(payload, "urlique", { expiresIn: 3600 });

//       res.status(200).send({
//         token: token,
//         message: "Login Successful",
//       });
//     } else {
//       res.status(400).send({ message: "Username or Password is wrong" });
//     }
//   }
//   res.status(400).send("request failed !");
// };

const createUsers = (req, res) => {
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  // const { username, password, name, hashtag, email, description, pri } =
  //   req.body;
  // const targetUser = await db.tbUsers.findOne({
  //   where: { username: username },
  // });

  if (0) {
    res.status(400).send("Username already taken");
    return;
  }

  const password = "nilson";
  const salt = bcryptjs.genSaltSync(12);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  console.log(hashedPassword);
  console.log(hashedPassword.length);
  // https://aloneonahill.com/blog/http-status-codes
  db.tbUsers
    .create({
      userAccount: "nilson@email.com",
      userPassword: hashedPassword,
      userDisplay: "Chai",
      userSalt: salt,
      isAdmin: true,
      firstName: "Virachai",
      lastName: "Wongsena",
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const regUsers = (req, res) => {
  // console.log(req);
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  const { email, password } = req.body;
  console.log(req.body);
  // res.status(400).send("Username already taken");
  // return;
  // const targetUser = await db.tbUsers.findOne({
  //   where: { userAccount: email },
  // });

  db.tbUsers
    .findOne({
      where: { userAccount: email },
    })
    .then((result) => {
      if (result) {
        res.status(400).send("Username already taken");
        return;
      }
    });

  // const password = "nilson";
  const firstName = email.split("@")[0];
  const salt = bcryptjs.genSaltSync(12);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  // console.log(hashedPassword);
  // console.log(hashedPassword.length);
  // https://aloneonahill.com/blog/http-status-codes
  db.tbUsers
    .create({
      userAccount: email,
      userPassword: hashedPassword,
      userDisplay: firstName,
      userSalt: salt,
      isAdmin: true,
      firstName: firstName,
      lastName: "-",
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createGroup = (req, res) => {
  console.log(req, res);
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }
  //res.status(201).send('createTodoItem');
  // const task = req.body.task;
  const groups = [
    { gname: "แบบร่าง", gcode: "aa", onReadonly: true },
    { gname: "รถนายก", gcode: "ab", onReadonly: false },
    { gname: "รถกู้ภัย", gcode: "ac", onReadonly: false },
    { gname: "วังดัง", gcode: "ad", onReadonly: false },
    { gname: "สำนักข่าว", gcode: "ae", onReadonly: false },
  ];
  db.sequelize
    .transaction(function (t) {
      var promises = [];
      for (let i = 0; i < groups.length; i++) {
        var newPromise = db.tbNewsGroups.create(
          {
            groupName: groups[i].gname,
            groupCode: groups[i].gcode,
            onReadonly: groups[i].onReadonly,
          },
          { transaction: t }
        );
        promises.push(newPromise);
      }
      return Promise.all(promises);
      // return Promise.all(promises).then(function (users) {
      //   var userPromises = [];
      //   for (let i = 0; i < users.length; i++) {
      //     // userPromises.push(users[i].addInvitations([group], {transaction: t});
      //   }
      //   return Promise.all(userPromises);
      // });
    })
    .then(function (result) {
      // console.log("YAY", result);
      res.status(201).send(result);
    })
    .catch(function (err) {
      console.log("NO!!!");
      res.status(400).send(err);
    });

  // db.tbNewsGroups
  //   .create({
  //     groupName: "แบบร่าง",
  //     groupCode: "aa",
  //     onActive: false,
  //   })
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
};

const checkUserAcc = (req, res, cb) => {
  // cb();
  // console.log("Callback", cb);
  //res.status(201).send('getTodoList');
  if (res) {
  }

  if (!req) {
    return cb("request failed !");
    // res.status(400).send("request failed !");
  }

  const { email, password } = req.body;
  if (!email) {
    return cb("request failed !");
    // res.status(400).send("request failed !");
  }

  let whereSQL = { where: { userAccount: email } };
  if (password && req.member) {
    if (req.member.pass.length < 6 || password.length < 4)
      return cb("request failed !");
    // console.log("password && req.member", req.member);
    const isCorrectPassword = bcryptjs.compareSync(password, req.member.pass);
    // console.log("isCorrectPassword", isCorrectPassword);
    if (!isCorrectPassword) return cb("request failed !");
    req.memberData = {
      username: req.member.data.userDisplay,
      firstName: req.member.data.firstName,
      lastName: req.member.data.lastName,
    };
    req.isCorrectPassword = isCorrectPassword;
    cb();
  }
  db.tbUsers
    .findOne(whereSQL)
    .then((result) => {
      // res.status(200).send(result);
      // console.log(result);
      if (result) {
        // console.log(result.dataValues);
        // req.member = password !== null ? result.dataValues.userSalt : true;
        req.member =
          password !== null
            ? { pass: result.dataValues.userPassword, data: result.dataValues }
            : true;
      } else req.member = false;

      cb();
    })
    .catch((err) => {
      // res.status(400).send(err);
      return cb(err);
    });
};

const getNewsList = (req, res) => {
  // cb();
  // console.log("Callback", cb);
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  db.tbUsers
    .findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getUserList = (req, res) => {
  // cb();
  // console.log("Callback", cb);
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  db.tbUsers
    .findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getGroupList = (req, res) => {
  // cb();
  // console.log("Callback", cb);
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  db.tbNewsGroups
    .findAll({ where: { onDeleted: false, onReadonly: false } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const unDeleteNews = (req, res) => {
  if (!req) return;

  db.tbNews
    .update(
      {
        onDeleted: false,
      },
      { where: { onDeleted: true } }
    )
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getNewsListData = (req, res) => {
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }
  //.findAll({ where: { onDeleted: false } })
  db.tbNews
    .findAll({
      where: { onDeleted: false },
      include: [{ model: db.tbNewsGroups }],
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getLottoData = (req, res) => {
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }
  //.findAll({ where: { onDeleted: false } })
  db.tbLotto
    .findAll({
      where: {
        drawType: {
          [Op.gt]: 0,
        },
      },
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// const getGroupListData = (req, res) => {
//   // cb();
//   // console.log("Callback", cb);
//   //res.status(201).send('getTodoList');
//   if (!req) {
//     res.status(400).send("request failed !");
//     return;
//   }

//   db.tbNewsGroups
//     .findAll({
//       where: { onDeleted: false, onReadonly: false },
//       // include: [{ model: db.tbNews }],
//     })
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// };

const lotto2db = (req, res) => {
  // if (req) res.status(200).send(csvFilePath);

  const filePath = "lottodb.txt"; //request.get("http://localhost:8000/lotto2db.csv")
  const filePathCsv = "lottodb.csv";

  // fs.readFile(filePath, "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(400).send(err);
  //     return;
  //   }
  //   res.status(200).send("jsonObj");
  //   console.log(data);
  // });

  csvtojson()
    .fromFile(filePathCsv)
    .then((jsonObj) => {
      // console.log(jsonObj);
      // res.status(200).send("jsonObj");
      jsonObj.forEach((itm) => {
        db.tbLotto.create({
          lottoDateTh: itm.lottoDateTh,
          lottoDateEn: itm.lottoDateEn,
          drawNumber: itm.drawNumber,
          drawType: itm.drawType,
        });
      });
      res.status(200).send("Created");

      // db.tbLotto
      //   .findAll()
      //   .then((result) => {
      //     res.status(200).send(result);
      //   })
      //   .catch((err) => {
      //     res.status(400).send(err);
      //   });
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       *
       */
      // db.tbLotto.create({
      //   lottoDateTh: lottoDateTh,
      //   lottoDateEn: lottoDateEn,
      //   drawNumber: drawNumber,
      //   drawType: drawType,
      // });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// https://www.tabnine.com/code/javascript/functions/express/Request/body

module.exports = {
  destroyUsers,
  createUsers,
  getNewsList,
  checkUserAcc,
  createGroup,
  clearGroup,
  getGroupList,
  getUserList,
  clearNews,
  unDeleteNews,
  getNewsListData,
  lotto2db,
  getLottoData,
  regUsers,
};
