import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../../entities/user/model/userSlice';
import transactionReducer from '../../entities/transactions/model/transactionSlice'
import categoryReducer from '../../entities/categories/model/categorySlice'
import goalReducer from '../../entities/fin-goals/goalSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    goal: goalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
