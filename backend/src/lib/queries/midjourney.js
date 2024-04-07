const db = require("../../models");
const constants = require("../../constants/constants");

saveGeneratedImage = async function (body) {
  try {
    return await db[constants.DB.table.MIDJOURNEY_MASTER].create(body);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  saveGeneratedImage,
};
