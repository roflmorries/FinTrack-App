import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import axios from 'axios'

const API_URL = "http://localhost:3001/transactions";

// export const fetchTransactions = createAsyncThunk<Transaction[], string>('transactions/fetchAll',
//   async userId => {
//     const data = localStorage.getItem(`transactions_${userId}`);
//     return data ? JSON.parse(data) : [];
//   }
// );

export const fetchTransactions = createAsyncThunk<Transaction[], string>('transactions/fetchAll',
  async (userId: string) => {
    const response = await axios.get<Transaction[]>(`${API_URL}?userId=${userId}`);
    return response.data;
  }
);

export const createTransaction = createAsyncThunk<Transaction, Omit<Transaction, 'id'>>('transactions/create',
  async (transaction) => {
    const response = await axios.post<Transaction>(API_URL, transaction);
    return response.data;
  }
);

export const updateTransaction = createAsyncThunk<Transaction, {id: string; changes: Partial<Transaction>}>('transactions/update',
  async ({ id, changes }) => {
    const response = await axios.put<Transaction>(`${API_URL}/${id}`, changes);
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk<string, string>('transactions/delete',
  async id => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// export const saveTransactionsToStorage = createAsyncThunk<void, {userId: string, transactions: Transaction[]}>(
//   'transactions/saveAll',
//   async ({userId, transactions}) => {
//     localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
//   }
// );

// export function saveTransactionsToStorageMock({ userId, transactions }: { userId: string, transactions: Transaction[] }) {
//   localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
// };

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