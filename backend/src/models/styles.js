const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const styles = sequelize.define(
    constant.DB.table.STYLE_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      style_name: { type: DataType.STRING },
      style_icon: { type: DataType.STRING },
    },
    {
      timestamps: false,
    }
  );

  return styles;
};
