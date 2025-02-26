import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true },
  name: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true},
});

export default mongoose.model("Reaction", reactionSchema);