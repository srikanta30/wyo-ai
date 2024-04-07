const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const themes = sequelize.define(
    constant.DB.table.THEME_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      theme: { type: DataType.STRING },
      prompt: { type: DataType.STRING },
      print_type: { type: DataType.STRING },
      style: { type: DataType.STRING },
      icon_image: { type: DataType.STRING },
    },
    {
      timestamps: false,
    }
  );

  return themes;
};
