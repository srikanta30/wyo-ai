const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const orders = sequelize.define(
    constant.DB.table.MIDJOURNEY_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      message_id: {
        type: DataType.STRING,
      },
      message: {
        type: DataType.JSON,
      },
      prompt: {
        type: DataType.STRING,
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
