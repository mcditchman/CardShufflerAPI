import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PollSchema = new Schema(
  {
    question: {
      type: String
    },
    options: [
      {
        option: {
          type: String
        },
        votes: Number
      }
    ]
  },
  { strict: false }
);

const Poll = mongoose.model("poll", PollSchema);

export default Poll;
