import { Request, Response } from "express";
import * as notificationService from '../services/notificationService';

export const getAll = async (req: Request, res: Response) => {
  const { userId } = req.user?.uid;
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const notifications = await notificationService.getNotificationByUser(userId);

  res.json(notifications);
};

export const create = async (req: Request, res: Response) => {
  const userId = req.user?.uid;
  const { message, severity } = req.body;
  if (!userId || !message || !severity) {
    res.status(400).json({ error: 'Missed required field' });
    return;
  };

  const notification = await notificationService.createNotification({userId, message, severity});

  res.json(notification);
};

export const markAsRead = async (req: Request, res: Response) => {
  const userId = req.user?.uid;
  const { id } = req.params;
  
  const notifications = await notificationService.getNotificationByUser(userId);
  const notification = notifications.find(n => n.id === id);
  if (!notification) {
    res.status(404).json({ error: 'Notification not found or forbidden' });
    return;
  }
  const updated = await notificationService.markAsRead(id);
  res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await notificationService.deleteNotification(id);
  res.json({ success: true });
}