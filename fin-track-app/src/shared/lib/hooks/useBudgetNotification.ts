import { useEffect, useRef } from 'react';
import { useAppDispatch } from './redux/reduxTypes';
import { addNotification } from '../../../entities/notifications/notificationThunk';

export function useBudgetNotifications(userId: string | undefined, budget: number | undefined, spent: number) {
  const dispatch = useAppDispatch();
  const notificationsSent = useRef(new Set<string>());

  useEffect(() => {
    if (!userId || !budget) return;
    
    const exceededKey = `budget-exceeded-${userId}-${Date.now()}`;
    const warningKey = `budget-warning-${userId}-${Date.now()}`;
    
    if (spent > budget && !notificationsSent.current.has('exceeded')) {
      dispatch(addNotification({
        userId,
        message: "Бюджет превышен!",
        severity: "error",
        read: false,
      }));
      notificationsSent.current.add('exceeded');
      notificationsSent.current.delete('warning');
    }
    
    else if (spent >= budget * 0.9 && spent <= budget && !notificationsSent.current.has('warning')) {
      dispatch(addNotification({
        userId,
        message: "Бюджет почти исчерпан!",
        severity: "warning", 
        read: false,
      }));
      notificationsSent.current.add('warning');
    }
    
    if (spent < budget * 0.9) {
      notificationsSent.current.clear();
    }
    
  }, [userId, budget, spent, dispatch]);
}