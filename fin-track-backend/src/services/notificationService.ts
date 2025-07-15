import { NotificationModel } from "../models/Notification";
import { Notification } from "../types";
import { v4 as uuidv4 } from 'uuid';

export const getNotificationByUser = async (userId: string): Promise<Notification[]> => {
  const found = await NotificationModel.find({ userId }).lean();
  return found;
};

export const createNotification = async (notification: Omit<Notification, 'id' | 'date'>): Promise<Notification> => {
  const newNotification = {
    id: uuidv4(),
    date: new Date().toISOString(),
    ...notification
  };
  const created = await NotificationModel.create(newNotification);
  return created.toObject();
};

export const markAsRead = async (id: string): Promise<Notification | null> => {
  const updated = await NotificationModel.findOneAndUpdate({id}, {read: true}, {new: true});
  return updated ? updated.toObject() : null;
};

export const deleteNotification = async (id: string): Promise<void> => {
  await NotificationModel.deleteOne({id});
}