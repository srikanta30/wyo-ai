// check url and prevent script tag using redirect
const constant = require("../constants/constants");
const logger = require("../lib/logger");

function xssUriRedirect() {
  return function (req, res, next) {
    const reIncompleteUri = /^(dev.|qa.)?llocalhost$/i;
    const reXss = /<([\s\S.]*)script[^>]*>/gi;
    const decodedUri = new URLSearchParams(req.url);
    if (reXss.test(decodedUri)) {
      logger.info(
        `CAUGHT: possibly malicious: script tag found in uri: ${decodedUri}`
      );
      res.redirect("/");
    } else if (reIncompleteUri.test(req.hostname)) {
      logger.info(
        `CAUGHT: possibly malicious: script tag found in uri: ${req.hostname}`
      );
      res.redirect(
        constant.response_code.RESOURCE_MOVED_PERMANENTLY,
        `http://www.${req.hostname}${req.url}`
      );
    } else {
      next();
    }
  };
}

module.exports = xssUriRedirect;
