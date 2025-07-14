import { RootState } from "../../app/store/store";
import { notificationsAdapter } from "./notificationSlice";

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
} = notificationsAdapter.getSelectors((state: RootState) => state.notification);