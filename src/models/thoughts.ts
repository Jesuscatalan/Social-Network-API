import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: false },
    username: { type: String, required: false },
    name: { type: String, required: false },
    reactions: [],
  },
  { timestamps: true }
);

export default mongoose.model('Thought', thoughtSchema);
