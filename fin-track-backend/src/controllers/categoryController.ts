import * as categoryService from '../services/categoryService';
import { Request, Response} from 'express';
import { categorySchema, categoryUpdateSchema } from '../validation/categorySchema';


export const getAll = async (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }
  const categories = await categoryService.getCategoriesByUser(userId);
  res.json(categories);
}

export const create = async (req: Request, res: Response) => {
  const { error, value } = categorySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const category = await categoryService.createCategory(value);
  res.json(category)
}

export const update = async (req: Request, res: Response) => {
  const { error, value } = categoryUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const category = await categoryService.updateCategory(req.params.id, value);
  if (!category) {
    res.status(404).json({error: 'Category not found'});
    return;
  }
  res.json(category)
}

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'id is required' });
    return;
  }
  await categoryService.deleteCategory(id);
  res.json({ success: true })
}