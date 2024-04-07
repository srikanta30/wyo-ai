const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const stores = sequelize.define(
    constant.DB.table.STORE_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      location: {
        type: DataType.STRING,
      },
      address: {
        type: DataType.STRING,
      },
      phone: {
        type: DataType.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return stores;
};
