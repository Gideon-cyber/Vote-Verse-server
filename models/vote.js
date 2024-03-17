import mongoose from "mongoose";
const voteSchema = new mongoose.Schema(
  {
    can_vote: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("vote", voteSchema);
export default Vote;
