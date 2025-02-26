import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }] // ✅ Added friends field
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
