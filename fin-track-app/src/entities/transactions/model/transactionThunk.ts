import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "./types";

export const fetchTransactions = createAsyncThunk<Transaction[], string>('transactions/fetchAll',
  async userId => {
    const data = localStorage.getItem(`transactions_${userId}`);
    return data ? JSON.parse(data) : [];
  }
);

export const saveTransactionsToStorage = createAsyncThunk<void, {userId: string, transactions: Transaction[]}>(
  'transactions/saveAll',
  async ({userId, transactions}) => {
    localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
  }
)