import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  avatar: { type: String, required: true },
  monthlyBudget: { type: Number }
})

export const UserModel = mongoose.model('User', userSchema);