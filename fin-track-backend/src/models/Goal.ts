import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  userId: { type: String, required: true},
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: String, required: true }
})

export const GoalModel = mongoose.model('Goal', goalSchema);
