"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set up express app
var app = (0, _express2.default)();

// connect MongoDB
_mongoose2.default.connect("mongodb://localhost/polls", { useMongoClient: true });
_mongoose2.default.Promise = global.Promise;

// use body-parser middleware
app.use(_bodyParser2.default.json());

// initialize routes
app.use("/api", require("./routes/api"));

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests on port 4000");
});