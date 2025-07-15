import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../shared/lib/hooks/redux/reduxTypes';
import { selectAllNotifications } from '../../entities/notifications/notificationSelectors';
import { markAsRead } from '../../entities/notifications/notificationThunk';

export default function AlertNotification() {
  const notifications = useAppSelector(selectAllNotifications);
  const dispatch = useAppDispatch();
  const shownNotifications = useRef(new Set<string>());

  useEffect(() => {
    notifications.forEach(notification => {
      if (!notification.read && !shownNotifications.current.has(notification.id)) {
        
        switch (notification.severity) {
          case 'error':
            toast.error(notification.message, {
              toastId: notification.id,
              autoClose: 6000,
              onClose: () => dispatch(markAsRead(notification.id))
            });
            break;
          case 'warning':
            toast.warn(notification.message, {
              toastId: notification.id,
              autoClose: 5000,
              onClose: () => dispatch(markAsRead(notification.id))
            });
            break;
          default:
            toast.info(notification.message, {
              toastId: notification.id,
              autoClose: 4000,
              onClose: () => dispatch(markAsRead(notification.id))
            });
        }
        
        shownNotifications.current.add(notification.id);
      }
    });
  }, [notifications, dispatch]);

  return null;
}