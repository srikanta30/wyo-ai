const response = require("../lib/response");
const constant = require("../constants/constants");
const links = require("../constants/links");
const axios = require("axios");
const { validationResult } = require("express-validator");
const fs = require("fs");
const util = require("util");
const db = require("../models");
const sequelize = db.sequelize;
const unlinkFile = util.promisify(fs.unlink);
const utils = require("../lib/utils");
const queryUsers = require("../lib/queries/users");
const logger = require("../lib/logger");
const jwt = require("jsonwebtoken");
const { send } = require("../lib/sms");

exports.signInWithOtp = async (req, res) => {
  try {
    let errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        utils.generateErrorMessage(errors),
        null,
        res,
        errors
      );
    }

    const { phone } = req.body;

    const userCountWithPhone = await queryUsers.countUserByPhone(phone);

    if (userCountWithPhone?.count === 0) {
      return response.sendResponse(
        constant.response_code.UNAUTHORIZED,
        constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
        null,
        res,
        null
      );
    }

    const otp = utils.generateOtp();

    await queryUsers.createOtp({ phone, otp });
    const result = await send(phone, otp);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      result,
      res
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        utils.generateErrorMessage(errors),
        null,
        res,
        errors
      );
    }

    const { phone, otp } = req.body;

    const otpResponse = await queryUsers.getOtpByPhone(phone);

    if (otpResponse?.otp === +otp) {
      const user = await queryUsers.getUserByPhone(phone);
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET);
      return response.sendResponse(
        constant.response_code.SUCCESS,
        "Success",
        { user, token },
        res
      );
    }

    return response.sendResponse(
      constant.response_code.UNAUTHORIZED,
      constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
      null,
      res,
      null
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.registerUser = async (req, res) => {
  try {
    let errors = await validationResult(req);

    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        utils.generateErrorMessage(errors),
        null,
        res,
        errors
      );
    }

    const { phone, name } = req.body;

    const userCountWithPhone = await queryUsers.countUserByPhone(phone);

    if (userCountWithPhone?.count !== 0) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        `User already exists.`,
        null,
        res
      );
    }

    await queryUsers.createUser({ name, phone });

    const otp = utils.generateOtp();

    await queryUsers.createOtp({ phone, otp });
    const result = await send(phone, otp);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      result,
      res
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};
