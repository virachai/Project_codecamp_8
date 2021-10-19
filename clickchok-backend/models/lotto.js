module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "tbLotto",
    {
      lottoDateEn: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
      },
      lottoDateTh: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
      },
      drawNumber: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
      },
      drawType: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
    },
    {
      tableName: "tb_lotto",
    }
  );

  return model;
};
