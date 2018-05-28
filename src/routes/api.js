import express from "express";
import mongoose from "mongoose";
import Deck from "../models/deckModel";

const router = express.Router();

// connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/decks`, { useMongoClient: true }).then(
  () => {
    console.log("Connection success!");
  },
  err =>{
    console.log("Connection Failed");
  }
);

// get a list of poll from the db
router.get("/deck", (req, res) => {
  res.send("TEST");
});

// add a new deck to the db
router.post("/deck", (req, res) => {
  let newDeck = new Deck({
    cards: [
      {value: "Cole", suite: "ColeSuite"}
    ]
  });

  newDeck.addCard("Cole3", "ColeSuite3");
  // Save the deck to the db
  newDeck.save((err) =>{
    if(err)
    {
      res.json({
        result: "failed",
        data: {},
        message: `Error message: ${err}`
      });
    }
    else
    {
      res.json({
        result:  "ok",
        data: newDeck
      });
    }
  });

});

module.exports = router;
