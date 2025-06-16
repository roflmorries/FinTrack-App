import { NextFunction, Request, Response } from "express";
import * as goalService from '../services/goalService';
import { goalSchema, goalUpdateSchema } from "../validation/goalSchema";


export const getAll = (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  if (!userId) {
    res.status(400).json({ error: 'userId is required' })
    return;
  }
  const goals = goalService.getGoalsByUser(userId);
  res.json(goals);
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = goalSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    const goal = goalService.createGoal(value);
    res.json(goal);
  } catch (error) {
    next(error);
  }
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = goalUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    const goal = goalService.updateGoal(req.params.id ,value);
    if (!goal) {
      res.status(404).json({error: 'Goal not found'});
      return;
    }
    res.json(goal);
  } catch (error) {
    next(error);
  }
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'id is required' });
    return;
  };
  goalService.deleteGoal(id);
  res.json({ success: true });
}