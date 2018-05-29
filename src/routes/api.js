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
router.get("/deck/:id", (req, res) => {
  Deck.findById(req.params.id, (err, deck) => {
    if(err){
      res.send(err);
    }
    else{
      res.send(deck);
    }
  });
});

// POST endpoint to create new shuffled deck and save it to the database
// Returns shuffled deck
router.post("/deck", (req, res) => {

  const newDeck = new Deck();
  
  // Populate deck with cards
  newDeck.populate();

  // Shuffle cards in deck
  newDeck.shuffle().then(() => {
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
});

module.exports = router;
