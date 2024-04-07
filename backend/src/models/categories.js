const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const categories = sequelize.define(
    constant.DB.table.CATEGORY_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      category_title: { type: DataType.STRING, allowNull: false },
      parent_sku: { type: DataType.STRING, allowNull: false },
      category_group: { type: DataType.STRING, allowNull: false },
      category_type: { type: DataType.STRING, allowNull: false },
      category_type_icon: { type: DataType.STRING, allowNull: false },
      style: { type: DataType.STRING, allowNull: false },
      print_type: { type: DataType.STRING, allowNull: false },
      filter_available: { type: DataType.STRING, allowNull: false },
      category_img: { type: DataType.STRING, allowNull: false },
      scaling_avaliable: { type: DataType.STRING, allowNull: false },
      shifting_available: { type: DataType.STRING, allowNull: false },
    },
    {
      timestamps: false,
    }
  );

  return categories;
};
