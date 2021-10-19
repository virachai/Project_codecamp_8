module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "tbUsers",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      userAccount: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      userSalt: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      userDisplay: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      userPhone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      onDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "tb_users",
    }
  );

  model.associate = (models) => {
    model.hasMany(models.tbNews, {
      foreignKey: "user_id",
      as: "tb_news",
    });
  };

  // db.food.hasMany(db.meal, {as : 'Food', foreignKey : 'idFood'});
  // db.meal.belongsTo(db.food, {foreignKey : 'idFood'});
  // db.meal.findAll({ include : [db.food] }).then(function (meals) {
  //   console.log(JSON.stringify(meals)); <-- each array element of meals should have an attribute `food`
  // });

  return model;
};
