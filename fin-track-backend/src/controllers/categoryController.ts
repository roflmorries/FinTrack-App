import * as categoryService from '../services/categoryService';
import { Request, Response, NextFunction } from 'express';


export const getAll = (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  const categories = categoryService.getCategoriesByUser(userId);
  res.json(categories);
}

export const create = (req: Request, res: Response) => {
  const category = categoryService.createCategory(req.body);
  res.json(category)
}

export const update = (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = categoryService.updateCategory(req.params.id, req.body);
    if (!category) {
      const error = new Error('Not found');
      (error as any).status = 404;
      return next(error);
    }
    return res.json(category)
  } catch (error) {
    next(error)
  }
}

export const remove = (req: Request, res: Response) => {
  categoryService.deleteCategory(req.params.id);
  res.json({ success: true })
}