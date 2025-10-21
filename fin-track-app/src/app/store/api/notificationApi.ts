import { Notification } from "../../../entities/notifications/types";
import { API_URL_NOTIFICATIONS } from "../../../shared/config/config";
import { api } from "./api";


export const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], string>({
          query: (userId: string) => `${API_URL_NOTIFICATIONS}?userId=${userId}`,
          providesTags: (result) =>
            result
              ? [
                ...result.map(({ id }) => ({ type: 'Goal' as const, id })),
                { type: 'Notification', id: 'LIST' },
              ]
              : [{ type: 'Notification', id: 'LIST' }],
        }),
        addNotification: builder.mutation<Notification, Omit<Notification, 'id' | 'date'>>({
          query: (notification) => ({
            url: API_URL_NOTIFICATIONS,
            method: 'POST',
            body: notification
          }),
          invalidatesTags: [{ type: 'Notification', id: 'LIST' }]
        }),
        markAsRead: builder.mutation<Notification, string>({
          query: (id) => ({
            url: `${API_URL_NOTIFICATIONS}/${id}`,
            method: 'PATCH',
            body: {read: true}
          }),
          invalidatesTags: (result, error, id) => [{ type: 'Notification', id }]
        }),
        deleteNotification: builder.mutation<void, string>({
          query: id => ({
            url: `${API_URL_NOTIFICATIONS}/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: (result, error, id) => [
            { type: 'Notification', id },
            { type: 'Notification', id: 'LIST' }
          ]
        }),
  })
});

export const {
  useGetNotificationsQuery,
  useAddNotificationMutation,
  useMarkAsReadMutation,
  useDeleteNotificationMutation
} = notificationApi;