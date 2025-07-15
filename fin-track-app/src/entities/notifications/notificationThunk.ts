import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notification } from "./types";
import { API_URL } from "../../shared/config/config";
import { api } from "../../shared/api/axiosWithAuth";

export const fetchAllNotifications = createAsyncThunk<Notification[], string>('notifications/fetchAll',
  async (userId: string) => {
    const res = await api.get<Notification[]>(`${API_URL}/notifications/?userId=${userId}`);
    console.log(res.data)
    return res.data;
  }
);

export const addNotification = createAsyncThunk<Notification, Omit<Notification, "id" | "date">>('notifications/add',
  async (notification) => {
    const res = await api.post<Notification>(`${API_URL}/notifications`, notification);
    return res.data;
  }
);

export const markAsRead = createAsyncThunk<Notification, string>(
  'notifications/markAsRead',
  async (id) => {
    const res = await api.patch<Notification>(`${API_URL}/notifications/${id}`, { read: true });
    return res.data;
  }
);

export const deleteNotification = createAsyncThunk<string, string>(
  "notifications/delete",
  async (id) => {
    await api.delete(`${API_URL}/notifications/${id}`);
    return id;
  }
);