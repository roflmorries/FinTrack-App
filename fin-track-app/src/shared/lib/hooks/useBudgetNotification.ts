import { useEffect } from 'react';
import { useAppDispatch } from './redux/reduxTypes';
import { addNotification } from '../../../entities/notifications/notificationThunk';

export function useBudgetNotifications(userId: string | undefined, budget: number | undefined, spent: number) {
  const dispatch = useAppDispatch();
  
  const storageKey = `budget-notifications-${userId}-${budget}`;
  
  useEffect(() => {
    
    if (!userId || !budget) {
      return;
    }
    
    const savedState = localStorage.getItem(storageKey);
    const lastState = savedState ? JSON.parse(savedState) : { exceeded: false, warning: false };
    
    
    const isExceeded = spent > budget;
    const isNearLimit = spent >= budget * 0.9 && spent <= budget;
    const isSafe = spent < budget * 0.8;
    
    if (isSafe && (lastState.exceeded || lastState.warning)) {
      localStorage.setItem(storageKey, JSON.stringify({ exceeded: false, warning: false }));
      return;
    }
    
    if (isExceeded && !lastState.exceeded) {
      dispatch(addNotification({
        userId,
        message: "Бюджет превышен!",
        severity: "error",
        read: false,
      }));
      localStorage.setItem(storageKey, JSON.stringify({ exceeded: true, warning: false }));
    }
    
    else if (isNearLimit && (!lastState.warning || lastState.exceeded)) {
      dispatch(addNotification({
        userId,
        message: "Бюджет почти исчерпан!",
        severity: "warning", 
        read: false,
      }));
      localStorage.setItem(storageKey, JSON.stringify({ exceeded: false, warning: true }));
    }
    
  }, [userId, budget, spent, dispatch, storageKey]);
}