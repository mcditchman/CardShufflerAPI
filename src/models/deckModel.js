import mongoose from "mongoose";
import request from "request";

const Schema = mongoose.Schema;
const DeckSchema = new Schema(
  {
    cards:[
      {
        value: {
          type: String,
          required: true
        },
        suit: {
          type: String,
          required: true
        }
      }
    ]
  }
);

// Adds a card to the current deck instance
DeckSchema.methods.addCard = function(newValue, newSuit){
  this.cards.push({
    value: newValue,
    suit: newSuit
  });
};

// Populates current deck with 52 cards
DeckSchema.methods.populate = function(){
  this.cards = [];
  ['Ace', '1', '2','3','4','5','6','7','8','9','10','Jack', 'Queen', 'King'].forEach(value => {
    ['Clubs','Diamonds','Hearts','Spades'].forEach(suit => {
      this.addCard(value, suit);
    })
  });
};

// Shuffles current deck
DeckSchema.methods.shuffle = function(){
  return new Promise ((resolve, reject) => {
    request('http://applicant.pointsource.us/api/random/5a95a6a5d625c81979aa798c?min=1&max=52&num=52',(err, res, body) =>{
      if(res.statusCode == 200){
        const js = JSON.parse(body);
        js.numbers.forEach((num, index) => {
          const temp = this.cards[index];
          this.cards[index] = this.cards[num - 1];
          this.cards[num - 1] = temp;
        });

        resolve();
      }
      else{
        return reject(res.statusMessage);
      }
    })
  });
};

const Deck = mongoose.model("Deck", DeckSchema);

export default Deck;
