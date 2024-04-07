const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const orders = sequelize.define(
    constant.DB.table.ORDER_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      store_id: {
        type: DataType.BIGINT,
        allowNull: false
      },
      user_id: {
        type: DataType.BIGINT,
        allowNull: false
      },
      image_url: {
        type: DataType.STRING,
        allowNull: false
      },
      order_details: {
        type: DataType.JSON,
        allowNull: false
      },
      status: {
        type: DataType.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
      updatedAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
    },
    {
      hooks: {
        beforeCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeUpdate: (record, options) => {
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeBulkUpdate: (record, options) => {
          record.attributes.updatedAt = Math.floor(Date.now());
        },
        beforeBulkCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
      },
    }
  );

  return orders;
};
