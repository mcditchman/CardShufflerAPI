import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// set up express app
const app = express();

// connect MongoDB
mongoose.connect(`mongodb://localhost/polls`, { useMongoClient: true });
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes/api"));

// listen for requests
app.listen(process.env.port || 4000, () => {
  console.log("now listening for requests on port 4000");
});
