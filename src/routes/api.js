import express from "express";
import mongoose from "mongoose";
import Deck from "../models/deckModel";

const router = express.Router();

// connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/decks`, { useMongoClient: true }).then(
  () => {
    console.log("Database connection success!");
  },
  err => {
    console.log("Database connection Failed");
  }
);

// POST to retrieve a deck from the DB using a given deck ID
router.post("/decks", (req, res, next) => {
  if(req.body.deckId){
    Deck.findOne({_id: req.body.deckId}, (err, deck) => {
      if(err){ next(err); }
      else if(!deck){
        res.status(404).send('No deck found for id!');
      }
      else{
        // Sort the deck by value before sending back
        deck.sort();
        res.send(deck);
      }
    });
  }
  else{
    res.status(400).send('Deck ID is required!');
  }
});

// POST endpoint to create new shuffled deck and save it to the database
// Returns shuffled deck
router.post("/shuffleddeck", (req, res, next) => {

  const newDeck = new Deck();
  
  // Populate deck with cards
  newDeck.populate();

  // Shuffle cards in deck
  newDeck.shuffle()
    .then(() => {
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
