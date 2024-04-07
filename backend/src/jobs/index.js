var schedule = require("node-schedule");
const logger = require("../lib/logger");
const constant = require("../constants/constants");

var Job = function () {
  this.startSchedular = function () {};

  this.startJobs = function () {
    this.startSchedular();
  };
};

module.exports = Job;
