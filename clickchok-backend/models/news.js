module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "tbNews",
    {
      newsName: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      newsDesc: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      newsImagePath: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      groupCode: {
        type: DataTypes.STRING(2),
        allowNull: false,
        defaultValue: 1,
      },
      createBy: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      updateBy: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      onDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      viewCount: {
        type: DataTypes.BIGINT(11),
        defaultValue: 0,
      },
    },
    {
      tableName: "tb_news",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.tbUsers, {
      foreignKey: "user_id",
    });

    model.belongsTo(models.tbNewsGroups, {
      foreignKey: "group_id",
    });
  };

  // TbNews.associate = (models) => {
  //   Dashboard.belongsTo(models.TbUser, {
  //     foreignKey: "createBy",
  //     targetKey: "id",
  //   });

  //   TbNews.hasMany(models.Chart, {
  //     foreignKey: "dashboard_id",
  //     sourceKey: "id",
  //   });
  // };

  return model;
};
