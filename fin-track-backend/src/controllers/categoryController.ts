import * as categoryService from '../services/categoryService';
import { Request, Response, NextFunction } from 'express';
import { categorySchema, categoryUpdateSchema } from '../validation/categorySchema';


export const getAll = (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }
  const categories = categoryService.getCategoriesByUser(userId);
  res.json(categories);
}

export const create = (req: Request, res: Response) => {
  const { error, value } = categorySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const category = categoryService.createCategory(value);
  res.json(category)
}

export const update = (req: Request, res: Response, next: NextFunction): void => {
  const { error, value } = categoryUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    const category = categoryService.updateCategory(req.params.id, value);
    if (!category) {
      const error = new Error('Not found');
      (error as any).status = 404;
      return next(error);
    }
    res.json(category)
  } catch (error) {
    next(error)
  }
}

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'id is required' });
    return;
  }
  categoryService.deleteCategory(id);
  res.json({ success: true })
}