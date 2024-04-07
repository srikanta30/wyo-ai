const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const otps = sequelize.define(
    constant.DB.table.OTP_MASTER,
    {
      id: { primaryKey: true, autoIncrement: true, type: DataType.BIGINT },
      phone: { type: DataType.BIGINT, allowNull: false },
      otp: {
        type: DataType.BIGINT,
        allowNull: false,
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

  return otps;
};
