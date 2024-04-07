const db = require("../../models");
const constants = require("../../constants/constants");

createUser = async function (body) {
  try {
    return await db[constants.DB.table.USER_MASTER].create(body);
  } catch (err) {
    throw new Error(err);
  }
};

updateUser = async function (obj, query) {
  try {
    return await db[constants.DB.table.USER_MASTER].update(obj, {
      where: query,
    });
  } catch (err) {
    throw new Error(err);
  }
};

getUserByPhone = async function (phone) {
  try {
    return await db[constants.DB.table.USER_MASTER].findOne({
      where: { phone },
    });
  } catch (err) {
    throw new Error(err);
  }
};

countUserByPhone = async function (phone) {
  try {
    return await db[constants.DB.table.USER_MASTER].findAndCountAll({
      where: { phone },
      limit: 1,
    });
  } catch (err) {
    throw new Error(err);
  }
};

createOtp = async function (body) {
  try {
    return await db[constants.DB.table.OTP_MASTER].create(body);
  } catch (err) {
    throw new Error(err);
  }
};

getOtpByPhone = async function (phone) {
  try {
    return await db[constants.DB.table.OTP_MASTER].findOne({
      where: {
        phone: phone,
      },
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    throw new Error(err);
  }
};

saveGeneratedPrompt = async function (prompt, user_id) {
  try {
    return await db[constants.DB.table.PROMPTS_MASTER].create({
      prompt,
      user_id,
    });
  } catch (err) {
    throw new Error(err);
  }
};

getRecentPrompts = async function (userid) {
  try {
    return await db[constants.DB.table.PROMPTS_MASTER].findAll({
      where: {
        user_id: userid,
      },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserByPhone,
  countUserByPhone,
  createOtp,
  getOtpByPhone,
  saveGeneratedPrompt,
  getRecentPrompts,
};
