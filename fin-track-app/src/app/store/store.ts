import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../../entities/user/model/userSlice';
import transactionReducer from '../../entities/transactions/model/transactionSlice';
import categoryReducer from '../../entities/categories/model/categorySlice';
import goalReducer from '../../entities/fin-goals/goalSlice';
import notificationReducer from '../../entities/notifications/notificationSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    goal: goalReducer,
    notification: notificationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
