import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  userId: {type: String, required: true},
  type: { type: String, required: true},
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  comment: { type: String },
  goalId: { type: String }
})

export const TransactionModel = mongoose.model('Transaction', transactionSchema);