import { Goal } from "../types";
import * as db from '../utils/db';
import { v4 as uuidv4 } from 'uuid';

export const getGoalsByUser = (userId: string): Goal[] => {
  const data = db.read();
  return data.goals.filter(goal => goal.userId === userId);
};

export const createGoal = (goal: Omit<Goal, 'id'>): Goal => {
  const data = db.read();
  const newGoal = {
    id: uuidv4(),
    ...goal
  };
  data.goals.push(newGoal);
  db.write(data);
  return newGoal;
};

export const updateGoal = (id: string, updates: Partial<Goal>): Goal | null => {
  const data = db.read();
  const idx = data.goals.findIndex(goal => goal.id === id);
  if (idx === -1) return null;
  data.goals[idx] = {...data.goals[idx], ...updates};
  db.write(data);
  return data.goals[idx];
};

export const deleteGoal = (id: string) : void => {
  const data = db.read();
  data.goals = data.goals.filter(goal => goal.id !== id);
  db.write(data);
}