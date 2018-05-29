import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// set up express app
const app = express();

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes/api"));

// listen for requests
app.listen(process.env.port || 4000, () => {
  console.log("now listening for requests on port 4000");
});
