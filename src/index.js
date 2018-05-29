import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// set up express app
const app = express();
const development = process.env.NODE_ENV !== 'prod';

// use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize routes
app.use("/api", require("./routes/api"));

// listen for requests
app.listen(process.env.port || 4000, () => {
  console.log("now listening for requests on port 4000");
});

// development error handler
// will print stacktrace
if (development) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .send({status:err.status, message: `MESSAGE: ${err.message} STACK:${err}`, type:'internal'});
  });

}
else{
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .send({status:err.status, message: err.message, type:'internal'});
  });
}




