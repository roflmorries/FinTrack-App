import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../../entities/user/model/userSlice';
import transactionReducer from '../../entities/transactions/model/transactionSlice';
import categoryReducer from '../../entities/categories/model/categorySlice';
import goalReducer from '../../entities/fin-goals/goalSlice';
import notificationReducer from '../../entities/notifications/notificationSlice'
import { api } from "./api/api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    goal: goalReducer,
    notification: notificationReducer,
    [api.reducerPath]: api.reducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
