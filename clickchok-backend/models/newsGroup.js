module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "tbNewsGroups",
    {
      groupName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      groupCode: {
        type: DataTypes.STRING(2),
        allowNull: true,
        unique: true,
      },
      onDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      onActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      onReadonly: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "tb_news_groups",
    }
  );

  model.associate = (models) => {
    model.hasMany(models.tbNews, {
      foreignKey: "group_id",
      as: "tb_news",
    });
  };

  return model;
};
