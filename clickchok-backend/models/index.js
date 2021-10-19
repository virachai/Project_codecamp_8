"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {}; //Port 3306

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

//console.log(sequelize, config.use_env_variable);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     //const model = sequelize['import'](path.join(__dirname, file));
//     //Fix 2021
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  // console.log(modelName);
  console.log(db[modelName]);
  if (db[modelName].associate) {
    // console.log(db[modelName].associate);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//https://www.bezkoder.com/sequelize-associate-one-to-many/

/*
We’re gonna define the models using Sequelize Model:

const Tutorial = sequelize.define("tutorial", { ... })
const Comment = sequelize.define("comment", { ... })

Tutorial.hasMany(Comment, { as: "comments" });
Comment.belongsTo(Tutorial, {
  foreignKey: "tutorialId",
  as: "tutorial",
});
Using Model.create() for creating new objects:

Tutorial.create({
  title: "title",
  description: "description",
})

Comment.create({
  name: "name",
  text: "text",
  tutorialId: 42,
})
*/
