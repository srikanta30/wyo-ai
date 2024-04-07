const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const products = sequelize.define(
    constant.DB.table.PRODUCT_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      product_title: { type: DataType.STRING },
      sku: { type: DataType.STRING },
      parent_sku: { type: DataType.STRING },
      size: { type: DataType.STRING },
      size_number: { type: DataType.INTEGER },
      color: { type: DataType.STRING },
      color_code: { type: DataType.STRING },
      color_icon: { type: DataType.STRING },
      image_link: { type: DataType.STRING },
      stock: { type: DataType.STRING },
      pattern_img: { type: DataType.STRING },
    },
    {
      timestamps: false,
    }
  );

  return products;
};
