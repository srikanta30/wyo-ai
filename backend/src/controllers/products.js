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
const queryProducts = require("../lib/queries/products");
const logger = require("../lib/logger");

exports.getCategories = async (req, res) => {
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

    const category = req.query.category;

    let result = await queryProducts.getAllCategoriesByGroup(category);

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

exports.getThemes = async (req, res) => {
  try {
    let result = await queryProducts.getAllThemes();

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

exports.getStyles = async (req, res) => {
  try {
    let result = await queryProducts.getAllStyles();

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

exports.getFilters = async (req, res) => {
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

    const { parent_sku, color } = req.query;

    let result = await queryProducts.getAllFilters(parent_sku, color);

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

exports.getProducts = async (req, res) => {
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

    const { parent_sku } = req.query;

    let result = await queryProducts.getProductsBySku(parent_sku);

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

exports.getAllStores = async (req, res) => {
  try {
    let result = await queryProducts.getAllStores();

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
