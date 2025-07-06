import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  userId: { type: String, required: true},
  name: { type: String, required: true },
  color: { type: String, required: true }
})

export const CategoryModel = mongoose.model('Category', categorySchema);