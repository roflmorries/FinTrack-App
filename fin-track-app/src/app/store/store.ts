import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../../entities/user/model/userSlice';
import transactionReducer from '../../entities/transactions/model/transactionSlice'
import categoryReducer from '../../entities/categories/model/categorySlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    category: categoryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
