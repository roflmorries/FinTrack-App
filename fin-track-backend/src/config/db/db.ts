import mongoose from 'mongoose';
import 'dotenv/config';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhqyyek.mongodb.net/${process.env.DB_NAME}`;

export const connectDB = async () => {
  await mongoose.connect(uri);
  console.log('connected to mongoDB');
}