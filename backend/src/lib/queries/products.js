const db = require("../../models");
const constants = require("../../constants/constants");

getAllCategoriesByGroup = async function (group) {
  try {
    return await db[constants.DB.table.CATEGORY_MASTER].findAll({
      attributes: [
        "category_type",
        "style",
        "category_img",
        "category_title",
        "parent_sku",
        "print_type",
        "filter_available",
        "category_type_icon",
      ],
      where: {
        category_group: group,
      },
      order: [["category_type", "DESC"]],
    });
  } catch (err) {
    throw new Error(err);
  }
};

getRandomPromptFromTheme = async function (theme) {
  try {
    return await db[constants.DB.table.THEME_MASTER].findOne({
      attributes: ["prompt"],
      where: {
        theme: theme,
      },
      order: [db.sequelize.random()],
    });
  } catch (err) {
    throw new Error(err);
  }
};

getAllThemes = async function () {
  try {
    return await db[constants.DB.table.THEME_MASTER].findAll({
      attributes: ["theme", "icon_image"],
      order: [["theme", "ASC"]],
      group: ["theme"],
    });
  } catch (err) {
    throw new Error(err);
  }
};

getAllStyles = async function () {
  try {
    return await db[constants.DB.table.STYLE_MASTER].findAll({
      order: [["style_name", "ASC"]],
    });
  } catch (err) {
    throw new Error(err);
  }
};

getAllFilters = async function (parent_sku, color) {
  try {
    return await db[constants.DB.table.FILTER_MASTER].findAll({
      where: {
        parent_sku,
        color,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

getProductsBySku = async function (parent_sku) {
  try {
    return await db[constants.DB.table.PRODUCT_MASTER].findAll({
      where: {
        parent_sku,
      },
      order: [["size_number", "ASC"]],
    });
  } catch (err) {
    throw new Error(err);
  }
};

getAllStores = async function () {
  try {
    return await db[constants.DB.table.STORE_MASTER].findAll({
      order: [["location", "ASC"]],
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllCategoriesByGroup,
  getRandomPromptFromTheme,
  getAllThemes,
  getAllStyles,
  getAllFilters,
  getProductsBySku,
  getAllStores,
};
