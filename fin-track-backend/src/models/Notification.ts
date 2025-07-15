import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ["info", "warning", "error"], required: true },
  read: { type: Boolean, default: false }
});

export const NotificationModel = mongoose.model('Notification', notificationSchema);