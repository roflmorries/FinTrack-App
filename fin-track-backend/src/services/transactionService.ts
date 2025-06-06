import { v4 as uuidv4 } from 'uuid';
import * as db from '../utils/db';
import { Transaction } from '../types';

export const getTransactionsByUser = (userId: string): Transaction[] => {
  const data = db.read();
  return data.transactions.filter(tx => tx.userId === userId);
}

export const createTransaction = (transaction: Omit<Transaction, 'id'>): Transaction => {
  const data = db.read();
  const newTransaction: Transaction = { ...transaction, id: uuidv4() };
  data.transactions.push(newTransaction);
  db.write(data);
  return newTransaction;
}

export const updateTransaction = (id: string, updates: Partial<Transaction>): Transaction | null => {
  const data = db.read();
  const idx = data.transactions.findIndex(tx => tx.id === id);
  if (idx === -1) return null;
  data.transactions[idx] = {...data.transactions[idx], ...updates};
  db.write(data);
  return data.transactions[idx];
}

export const deleteTransaction = (id: string): void => {
  const data = db.read();
  data.transactions = data.transactions.filter(tx => tx.id !== id);
  db.write(data);
}