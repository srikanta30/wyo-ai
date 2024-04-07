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
const queryOrders = require("../lib/queries/orders");
const logger = require("../lib/logger");

exports.createOrder = async (req, res) => {
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

    const { store_id, image_url, order_details } = req.body;

    const user_id = req?.user?.dataValues?.id;

    if (!user_id) {
      return response.sendResponse(
        constant.response_code.UNAUTHORIZED,
        constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
        null,
        res,
        null
      );
    }

    const result = await queryOrders.createNewOrder({
      store_id,
      user_id,
      image_url,
      order_details,
      status: "IN_REVIEW",
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

exports.getAllOrdersByStore = async (req, res) => {
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

    const { store_id } = req.query;

    const result = await queryOrders.getAllOrdersByStore(store_id);

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

exports.getOrderDetails = async (req, res) => {
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

    const result = await queryOrders.getOrderById(id);

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

exports.updateOrderStatus = async (req, res) => {
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
    
    const { status } = req.body;
    const { id } = req.params;

    const result = await queryOrders.updateOrderStatus(status, id);

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
