import { Goal } from "../types";
import * as db from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import { GoalModel } from "../models/Goal";

export const getGoalsByUser = async (userId: string): Promise <Goal[]> => {
  const found = await GoalModel.find({userId}).lean();
  return found.map(({ id, userId, name, amount, deadline }) => ({
    id, userId, name, amount, deadline
  }));
};

export const createGoal = async (goal: Omit<Goal, 'id'>): Promise <Goal> => {
  const newGoal = {
    id: uuidv4(),
    ...goal
  };
  const created = await GoalModel.create(newGoal);
  const { id, userId, name, amount, deadline } = created.toObject();
  return { id, userId, name, amount, deadline };
};

export const updateGoal = async (id: string, updates: Partial<Goal>): Promise <Goal | null> => {
  const updated = await GoalModel.findOneAndUpdate({ id }, updates, { new: true });
  if (!updated) return null;
  const { id: goalId, userId, name, amount, deadline } = updated.toObject();
  return { id: goalId, userId, name, amount, deadline };
};

export const deleteGoal = async (id: string) : Promise <void> => {
  await GoalModel.deleteOne({id});
}