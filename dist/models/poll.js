"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var PollSchema = new Schema({
  question: {
    type: String
  },
  options: [{
    option: {
      type: String
    },
    votes: Number
  }]
}, { strict: false });

var Poll = _mongoose2.default.model("poll", PollSchema);

exports.default = Poll;