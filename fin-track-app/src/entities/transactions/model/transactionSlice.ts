import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import { fetchTransactions } from "./transactionThunk";


export const transactionAdapter = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = transactionAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      transactionAdapter.addOne(state, action.payload);
    },
    updateTransaction: (state, action: PayloadAction<{id: string; changes: Partial<Transaction>}>) => {
      transactionAdapter.updateOne(state, action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      transactionAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        transactionAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTransactions.rejected, state => {
        state.loading = false;
        state.error = 'Failed to load transactions'
      });
  }
})

export const {addTransaction, updateTransaction, deleteTransaction} = transactionsSlice.actions;

export default transactionsSlice.reducer;