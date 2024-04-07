const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const filters = sequelize.define(
    constant.DB.table.FILTER_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      parent_sku: { type: DataType.STRING },
      color: { type: DataType.STRING },
      image: { type: DataType.STRING },
    },
    {
      timestamps: false,
    }
  );

  return filters;
};
