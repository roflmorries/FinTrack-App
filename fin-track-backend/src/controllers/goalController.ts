import { NextFunction, Request, Response } from "express";
import * as goalService from '../services/goalService';
import { goalSchema, goalUpdateSchema } from "../validation/goalSchema";


export const getAll = async (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  if (!userId) {
    res.status(400).json({ error: 'userId is required' })
    return;
  }
  const goals = await goalService.getGoalsByUser(userId);
  res.json(goals);
};

export const create = async (req: Request, res: Response) => {
  const { error, value } = goalSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const goal = await goalService.createGoal(value);
  res.json(goal);
};

export const update = async (req: Request, res: Response) => {
  const { error, value } = goalUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  const goal = await goalService.updateGoal(req.params.id ,value);
  if (!goal) {
    res.status(404).json({error: 'Goal not found'});
    return;
  }
  res.json(goal);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'id is required' });
    return;
  };
  await goalService.deleteGoal(id);
  res.json({ success: true });
}