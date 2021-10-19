const db = require("../models");
// const uniqid = require("uniqid");
const uuid = "797242d3-c84f-4751-a8c1-7a6173e5d760";

const createGroup = (req, res) => {
  if (!req || !req.groupCode) {
    res.status(400).send("request failed !");
    return;
  }
  //res.status(201).send('createTodoItem');
  const groupName = req.body.groupName;
  db.tbNewsGroups
    .create({
      groupName: groupName,
      groupCode: req.groupCode,
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createNews = (req, res) => {
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }
  //res.status(201).send('createTodoItem');
  // console.log("hostname", req.hostname);
  const newsImagePath = req.file.path;
  // console.log("newsImagePath length", req.file.filename.length);
  const { newsName, newsDesc, newsGroupId, newsGroupCode } = req.body;
  console.log(newsName.length, newsDesc.length);
  // console.log(req.body);
  db.tbNews
    .create({
      newsName: newsName,
      newsDesc: newsDesc,
      newsImagePath: newsImagePath,
      groupCode: newsGroupCode,
      createBy: uuid,
      updateBy: uuid,
      user_id: uuid,
      group_id: Number(newsGroupId),
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const genGroupCode = (req, res, cb) => {
  //res.status(201).send('getTodoList');
  if (res) {
  }

  if (!req) {
    // res.status(400).send("request failed !");
    return cb("request failed !");
  }

  db.tbNewsGroups
    .findOne({ limit: 1, order: [["id", "DESC"]] })
    .then((result) => {
      // console.log("genGroupCode", result.dataValues);
      if (!result) return cb("query failed !");
      // req.groupCode = result.result

      const gCode = result.dataValues.groupCode;
      const newId = Number(result.dataValues.id);

      if (newId > 24 * 24) {
        return cb("table max length !");
      }
      // console.log("gCode", gCode);
      // console.log("gCode", gCode.charCodeAt(0));
      // console.log("gCode", gCode.charCodeAt(1));
      // console.log("genGroupCode", result);
      //"The character code 122 is equal to z"
      //"The character code 97 is equal to a"
      let SecondChar =
        gCode.charCodeAt(1) === 122 ? 97 : gCode.charCodeAt(1) + 1;
      let firstChar =
        gCode.charCodeAt(0) + (gCode.charCodeAt(1) === 122 ? 1 : 0);

      // const DigiA = Math.floor(newId / 24) + 97;
      // const DigiB = (newId % 24) + 97;

      // firstChar = DigiA;
      // SecondChar = DigiB;

      console.log("firstChar", firstChar, SecondChar);

      if (
        firstChar < 97 ||
        firstChar > 122 ||
        SecondChar < 97 ||
        SecondChar > 122
      ) {
        return cb("table max length !");
      }

      req.groupCode = String.fromCharCode(firstChar, SecondChar).toString();
      console.log("genGroupCode", req.groupCode);
      //String.fromCharCode(189, 43, 190, 61);
      // res.status(200).send(result);
      cb();
    })
    .catch((err) => {
      return cb(err);
    });
};
// genGroupCode(1, 1, 1);

const getGroupList = (req, res) => {
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }
  //.findAll({ where: { onDeleted: false } })
  db.tbNewsGroups
    .findAll({ where: { onDeleted: false } })
    .then((result) => {
      res.status(200).send(result);
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

const getNewsList = (req, res) => {
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }
  //.findAll({ where: { onDeleted: false } })
  db.tbNews
    .findAll({ where: { onDeleted: false } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getGroupById = (req, res) => {
  const targetId = Number(req.params.id);
  db.tbNewsGroups
    .findOne({ where: { id: targetId, onDeleted: false } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getNewsById = (req, res) => {
  const targetId = Number(req.params.id);
  db.tbNews
    .findOne({ where: { id: targetId, onDeleted: false } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateGroup = (req, res) => {
  // if (!req && !res) return;

  const targetId = Number(req.params.id);
  const { groupName } = req.body;
  console.log("groupName", groupName, targetId);

  db.tbNewsGroups
    .update(
      {
        groupName: groupName,
      },
      { where: { id: targetId } }
    )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateNews = (req, res) => {
  // if (!req && !res) return;

  const targetId = Number(req.params.id);

  const { newsName, newsDesc, newsGroupId, newsGroupCode, newsImageName } =
    req.body;
  const newsImagePath = req.file
    ? req.file.path
    : "public\\uploads\\news\\" + newsImageName;
  console.log("file", req.file);
  // const newsImagePath = req.file.path;
  // console.log("newsImagePath length", req.file.filename.length);

  // console.log("groupName", newsName, targetId);

  db.tbNews
    .update(
      {
        newsName: newsName,
        newsDesc: newsDesc,
        newsImagePath: newsImagePath,
        groupCode: newsGroupCode,
        updateBy: uuid,
        user_id: uuid,
        group_id: Number(newsGroupId),
      },
      { where: { id: targetId } }
    )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteGroup = (req, res) => {
  const targetId = Number(req.params.id);
  console.log(req.params, targetId);
  db.tbNewsGroups
    .update(
      {
        onDeleted: true,
      },
      { where: { id: targetId } }
    )
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const removeGroup = (req, res) => {
  const targetId = Number(req.params.id);
  console.log(req.params, targetId);
  db.tbNewsGroups
    .update(
      {
        onDeleted: true,
      },
      { where: { id: targetId } }
    )
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteNewsList = (req, res) => {
  console.log(req.body);
  if (!req) res.status(400).send({});
  if (!req.body) res.status(400).send({});
  if (!req.body.item) res.status(400).send({});

  db.tbNews
    .update(
      {
        onDeleted: true,
      },
      { where: { id: [...req.body.item] } }
    )
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const removeNewsList = (req, res) => {
  console.log(req.body);
  if (!req) res.status(400).send({});
  if (!req.body) res.status(400).send({});
  if (!req.body.item) res.status(400).send({});

  db.tbNews
    .destroy({ where: { id: [...req.body.item] } })
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const removeNewsItem = (req, res) => {
  const targetId = Number(req.params.id);
  console.log(req.params, targetId);
  db.tbNews
    .destroy({ where: { id: targetId } })
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  getGroupById,
  getGroupList,
  createGroup,
  deleteGroup,
  updateGroup,
  genGroupCode,
  createNews,
  getNewsList,
  getNewsById,
  updateNews,
  getNewsListData,
  deleteNewsList,
  removeNewsList,
  removeGroup,
  removeNewsItem,
};
