import * as transactionService from '../services/transactionService';
import { Request, Response } from 'express';
import { transactionSchema, transactionUpdateSchema } from '../validation/transactionSchema';

export const getAll = async (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }
  const transactions = await transactionService.getTransactionsByUser(userId);
  res.json(transactions);
}

export const create = async (req: Request, res: Response) => {
  const { error, value } = transactionSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  console.log('Received transactions', value)
  const transaction = await transactionService.createTransaction(value);
  res.json(transaction);
}

export const update = async (req: Request, res: Response) => {
  const { error, value } = transactionUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const transaction = await transactionService.updateTransaction(req.params.id, value);
  if (!transaction) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json(transaction);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'id is required' });
    return;
  }
  await transactionService.deleteTransaction(id);
  res.json({ succes: true });
}