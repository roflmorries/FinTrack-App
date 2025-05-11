import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../../entities/user/model/userSlice';
import transactionReducer from '../../entities/transactions/model/transactionSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
