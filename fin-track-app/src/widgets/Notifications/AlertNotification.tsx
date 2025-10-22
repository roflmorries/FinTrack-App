import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import { useGetNotificationsQuery, useMarkAsReadMutation } from '../../app/store/api/notificationApi';

export default function AlertNotification() {
  const userId = useAppSelector(state => state.user.currentUser?.uid)
  const { data: notifications = [], error, isLoading } = useGetNotificationsQuery(userId || '', { skip: !userId });
  const [markAsRead] = useMarkAsReadMutation();
  const shownNotifications = useRef(new Set<string>());

  
  console.log('Notifications data:', notifications);
  console.log('Notifications error:', error);
  console.log('Notifications loading:', isLoading);

  useEffect(() => {
    notifications.forEach(notification => {
      if (!notification.read && !shownNotifications.current.has(notification.id)) {

        const handleMarkAsRead = async () => {
          try {
            await markAsRead(notification.id).unwrap();
          } catch (error) {
            console.error('Failed to mark notification as read', error)
          }
        }

        switch (notification.severity) {
          case 'error':
            toast.error(notification.message, {
              toastId: notification.id,
              autoClose: 6000,
              onClose: handleMarkAsRead
            });
            break;
          case 'warning':
            toast.warn(notification.message, {
              toastId: notification.id,
              autoClose: 5000,
              onClose: handleMarkAsRead
            });
            break;
          default:
            toast.info(notification.message, {
              toastId: notification.id,
              autoClose: 4000,
              onClose: handleMarkAsRead
            });
        }

        shownNotifications.current.add(notification.id);
      }
    });
  }, [notifications, markAsRead]);

  return null;
}