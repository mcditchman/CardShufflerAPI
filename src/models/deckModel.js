import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DeckSchema = new Schema(
  {
    cards:[
      {
        value: {
          type: String,
          required: true
        },
        suite: {
          type: String,
          required: true
        }
      }
    ]
  }
);

DeckSchema.methods.addCard = function(newValue, newSuite){
  this.cards.push({
    value: newValue,
    suite: newSuite
  });
};

const Deck = mongoose.model("Deck", DeckSchema);

export default Deck;
