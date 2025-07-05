import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import axios from 'axios'
import { API_URL } from "../../../shared/config/config";
import { api } from "../../../shared/api/axiosWithAuth";

const API_URL_TRANSACTIONS = `${API_URL}/transactions`;


export const fetchTransactions = createAsyncThunk<Transaction[], string>('transactions/fetchAll',
  async (userId: string) => {
    const response = await api.get<Transaction[]>(`${API_URL_TRANSACTIONS}?userId=${userId}`);
    return response.data;
  }
);

export const createTransaction = createAsyncThunk<Transaction, Omit<Transaction, 'id'>>('transactions/create',
  async (transaction) => {
    const response = await api.post<Transaction>(API_URL_TRANSACTIONS, transaction);
    return response.data;
  }
);

export const updateTransaction = createAsyncThunk<Transaction, {id: string; changes: Partial<Transaction>}>('transactions/update',
  async ({ id, changes }) => {
    const response = await api.put<Transaction>(`${API_URL_TRANSACTIONS}/${id}`, changes);
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk<string, string>('transactions/delete',
  async id => {
    await api.delete(`${API_URL_TRANSACTIONS}/${id}`);
    return id;
  }
);

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