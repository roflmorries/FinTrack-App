import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notification } from "./types";
import axios from "axios";
import { API_URL } from "../../shared/config/config";

export const fetchAllNotifications = createAsyncThunk<Notification[]>('notifications/fetchAll',
  async () => {
    const res = await axios.get<Notification[]>(`${API_URL}/notifications`);
    return res.data;
  }
);

export const addNotification = createAsyncThunk<Notification, Omit<Notification, "id" | "date">>('notifications/add',
  async (notification) => {
    const res = await axios.post<Notification>(`${API_URL}/notifications`, notification);
    return res.data;
  }
);

export const markAsRead = createAsyncThunk<Notification, string>(
  'notifications/markAsRead',
  async (id) => {
    const res = await axios.patch<Notification>(`${API_URL}/notifications/${id}`, { read: true });
    return res.data;
  }
);

export const deleteNotification = createAsyncThunk<string, string>(
  "notifications/delete",
  async (id) => {
    await axios.delete(`${API_URL}/notifications/${id}`);
    return id;
  }
);