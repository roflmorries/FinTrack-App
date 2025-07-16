import { v4 as uuidv4 } from 'uuid';
import * as db from '../utils/db';
import { Transaction } from '../types';
import { TransactionModel } from '../models/Transaction';

export const getTransactionsByUser = async (userId: string): Promise <Transaction[]> => {
  const found = await TransactionModel.find({userId}).lean();
  return found.map(({ id, userId, type, amount, category, date, comment, goalId }) => ({
    id,
    userId,
    type,
    amount,
    category,
    date,
    comment: comment === null ? undefined : comment,
    goalId: goalId === null ? undefined : goalId
  }));
}

export const createTransaction = async (transaction: Omit<Transaction, 'id'>): Promise <Transaction | null> => {
  const newTransaction: Transaction = { ...transaction, id: uuidv4() };
  const created = await TransactionModel.create(newTransaction)
  const { id, userId, type, amount, category, date, comment, goalId } = created.toObject();
  return { id, userId, type, amount, category, date, comment: comment === null ? undefined : comment, goalId: goalId === null ? undefined : goalId };
}

export const updateTransaction = async (id: string, updates: Partial<Transaction>): Promise <Transaction | null> => {
  const updated = await TransactionModel.findOneAndUpdate({ id }, updates, { new: true });
  if (!updated) return null;
  const { id: txId, userId, type, amount, category, date, comment, goalId } = updated.toObject();
  return { id: txId, userId, type, amount, category, date, comment: comment === null ? undefined : comment, goalId: goalId === null ? undefined : goalId };
}

export const deleteTransaction = async (id: string): Promise <void> => {
  await TransactionModel.deleteOne({ id })
}