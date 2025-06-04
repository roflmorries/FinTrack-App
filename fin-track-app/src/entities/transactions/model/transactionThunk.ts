import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import axios from 'axios'

export const fetchTransactions = createAsyncThunk<Transaction[], string>('transactions/fetchAll',
  async userId => {
    const data = localStorage.getItem(`transactions_${userId}`);
    return data ? JSON.parse(data) : [];
  }
);

// export const saveTransactionsToStorage = createAsyncThunk<void, {userId: string, transactions: Transaction[]}>(
//   'transactions/saveAll',
//   async ({userId, transactions}) => {
//     localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
//   }
// );

export function saveTransactionsToStorageMock({ userId, transactions }: { userId: string, transactions: Transaction[] }) {
  localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
};

export const detectCategoryByDescription = createAsyncThunk<string, string>(
  'categories/detectCategoryByDescription',
  async (description, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ category: string }>(
        'http://localhost:3001/api/detect-category',
        { description }
      );
      return response.data.category
    } catch (error: any) {
      return rejectWithValue(error.message || 'Detect category was failed')
    }
  }
)