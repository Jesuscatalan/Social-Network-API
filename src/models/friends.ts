import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  friend: {type: String, required: true},
  friendId: {type: Number, required: true},
  username: {type: String, required: true},
  userId: {type: Number, required: true},
  email: {type: String, required: true},
  name: {type: String, required: true},
},
  {timestamps: true}
);

export default mongoose.model("Friend", friendSchema);