import express from "express";
import Poll from "../models/poll";

const router = express.Router();

// get a list of poll from the db
router.get("/polls", (req, res) => {
  Poll.find({}).then(function(p) {
    res.send(p);
  });
});

// add a new poll to the db
router.post("/add", (req, res) => {
  Poll.create({
    question: req.body.question,
    options: req.body.options
  }).then(p => {
    res.send(p);
  });
});

module.exports = router;
