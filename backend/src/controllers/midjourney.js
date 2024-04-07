require("dotenv").config();
const { TNL } = require("tnl-midjourney-api");

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
const queryMidjourney = require("../lib/queries/midjourney");
const logger = require("../lib/logger");

const midjourney = new TNL(process.env.NEXTLEG_TOKEN);

exports.generateImage = async (req, res) => {
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

    const { prompt } = req.body;

    const result = await midjourney.imagine(prompt);

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

exports.checkImageStatus = async (req, res) => {
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

    const { id } = req.params;

    const result = await midjourney.getMessageAndProgress(id, 2);

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

exports.saveGeneratedImage = async (req, res) => {
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

    const { message_id, message, prompt } = req.body;

    const result = await queryMidjourney.saveGeneratedImage({
      message_id,
      message,
      prompt,
    });

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
