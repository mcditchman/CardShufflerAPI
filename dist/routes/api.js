"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _poll = require("../models/poll");

var _poll2 = _interopRequireDefault(_poll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// get a list of poll from the db
router.get("/polls", function (req, res) {
  _poll2.default.find({}).then(function (p) {
    res.send(p);
  });
});

// add a new poll to the db
router.post("/add", function (req, res) {
  _poll2.default.create({
    question: req.body.question,
    options: req.body.options
  }).then(function (p) {
    res.send(p);
  });
});

module.exports = router;