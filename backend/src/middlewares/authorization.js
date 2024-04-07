require("dotenv").config();
const response = require("../lib/response");
const constant = require("../constants/constants");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    req.token = req.headers.authorization;
    if (!req?.token) {
      return response.sendResponse(
        constant.response_code.UNAUTHORIZED,
        constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
        null,
        res,
        null
      );
    }
    req.user = jwt.verify(req.token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return response.sendResponse(
      constant.response_code.UNAUTHORIZED,
      constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
      null,
      res,
      null
    );
  }
};

module.exports = authorization;
