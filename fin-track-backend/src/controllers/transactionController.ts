import * as transactionService from '../services/transactionService';
import { Request, Response } from 'express';

export const getAll = (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  const transactions = transactionService.getTransactionsByUser(userId);
  res.json(transactions);
}

export const create = (req: Request, res: Response) => {
  const transaction = transactionService.createTransaction(req.body);
  res.json(transaction);
}

export const update = (req: Request, res: Response) => {
  const transaction = transactionService.updateTransaction(req.params.id, req.body);
  if (!transaction) return res.status(404).json({ error: 'Not found' });
  res.json(transaction)
}

export const remove = (req: Request, res: Response) => {
  transactionService.deleteTransaction(req.params.id);
  res.json({ succes: true });
}