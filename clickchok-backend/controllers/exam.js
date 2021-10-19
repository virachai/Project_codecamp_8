const db = require("../models");
const uniqid = require("uniqid");
//uniqid()
//const { uniqueId } = require("lodash");

const createTodoItem = (req, res) => {
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }
  //res.status(201).send('createTodoItem');
  const task = req.body.task;
  db.task
    .create({
      taskUnique: uniqid(),
      isDoing: false,
      isDone: false,
      taskName: task,
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getTodoList = (req, res) => {
  //res.status(201).send('getTodoList');
  if (!req) {
    res.status(400).send("request failed !");
    return;
  }

  db.task
    .findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getTodoItem = (req, res) => {
  const targetId = Number(req.params.id);
  db.task
    .findOne({ where: { id: targetId } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateTodoItem = (req, res) => {
  if (!req && !res) return;

  let updatedTask = req.body.taskName;
  let updatedIsisDoing = Boolean(Number(req.body.isDoing));
  let updatedIsisDone = Boolean(Number(req.body.isDone));
  const targetId = Number(req.params.id);
  //let taskNameOld = null;
  //console.log(targetId, updatedTask, updatedIsisDoing);
  //res.status(200).send(updatedTask);
  //return;

  db.task
    .findOne({ where: { id: targetId } })
    .then((result) => {
      console.log("update id", result.dataValues.isDoing);
      //const data = result.task.dataValues.id;
      //console.log('update data', data);
      updatedTask = !!updatedTask ? updatedTask : result.dataValues.taskName;
      updatedIsisDoing = updatedIsisDoing
        ? updatedIsisDoing
        : !!result.dataValues.isDoing;
      updatedIsisDone = updatedIsisDone
        ? updatedIsisDone
        : !!result.dataValues.isDone;
      //console.log(targetId, updatedIsisDoing, updatedIsisDone);

      db.task
        .update(
          {
            taskName: updatedTask,
            isDoing: updatedIsisDoing,
            isDone: updatedIsisDone,
          },
          { where: { id: targetId } }
        )
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteTodoItem = (req, res) => {
  const targetId = Number(req.params.id);
  db.task
    .destroy({ where: { id: targetId } })
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  createTodoItem,
  getTodoList,
  getTodoItem,
  updateTodoItem,
  deleteTodoItem,
};
