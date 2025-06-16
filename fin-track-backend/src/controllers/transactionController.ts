import * as transactionService from '../services/transactionService';
import { NextFunction, Request, Response } from 'express';
import { transactionSchema, transactionUpdateSchema } from '../validation/transactionSchema';

export const getAll = (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  const transactions = transactionService.getTransactionsByUser(userId);
  res.json(transactions);
}

export const create = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = transactionSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
  console.log('Received transactions', value)
  const transaction = transactionService.createTransaction(value);
  res.json(transaction);
  } catch (error) {
    next(error)
  }
}

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = transactionUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    const transaction = transactionService.updateTransaction(req.params.id, value);
    if (!transaction) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(transaction);
  } catch (err) {
    next(err);
  }
};

export const remove = (req: Request, res: Response) => {
  transactionService.deleteTransaction(req.params.id);
  res.json({ succes: true });
}