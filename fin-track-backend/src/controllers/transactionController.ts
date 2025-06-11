import * as transactionService from '../services/transactionService';
import { NextFunction, Request, Response } from 'express';

export const getAll = (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  const transactions = transactionService.getTransactionsByUser(userId);
  res.json(transactions);
}

export const create = (req: Request, res: Response) => {
  console.log('Received transactions', req.body)
  const transaction = transactionService.createTransaction(req.body);
  res.json(transaction);
}

export const update = (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = transactionService.updateTransaction(req.params.id, req.body);
    if (!transaction) {
      const error = new Error('Not found');
      (error as any).status = 404;
      return next(error);
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