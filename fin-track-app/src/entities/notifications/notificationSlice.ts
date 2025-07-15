import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Notification } from "./types";
import { addNotification, deleteNotification, fetchAllNotifications, markAsRead } from "./notificationThunk";

export const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notificationsAdapter.getInitialState({
  isLoading: false,
  error: null as string | null
});

const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        notificationsAdapter.setAll(state, action.payload);
        state.isLoading = false;
      })
      .addCase(fetchAllNotifications.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })

      .addCase(addNotification.fulfilled, (state, action) => {
        notificationsAdapter.addOne(state, action.payload);
      })
      .addCase(addNotification.pending, state => {
        state.error = null;
      })
      .addCase(addNotification.rejected, (state, action) => {
        state.error = action.error.message || null;
      })

      .addCase(markAsRead.fulfilled, (state, action) => {
        notificationsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { read: true }
        });
      })
      .addCase(markAsRead.pending, state => {
        state.error = null;
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error = action.error.message || null;
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        notificationsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
  }
});

export default notificationsSlice.reducer;