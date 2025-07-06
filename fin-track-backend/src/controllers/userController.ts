import { Request, Response } from "express";
import * as userService from '../services/userService';
import * as categoryService from '../services/categoryService';
import * as db from '../utils/db';

export const create = async (req: Request, res: Response) => {
  const { uid, email, fullName, avatar } = req.body;
  if (!uid || !email) {
    res.status(400).json({ error: 'Missed required fields' });
    return;
  };
  const exists = await userService.getUserByUid(uid);
  if (exists) {
    res.status(409).json({error: 'User already exists'});
    return;
  }
  const user = await userService.createUser({ uid, email, fullName, avatar });
  await categoryService.createDefaultCategoriesForUser(uid);
  res.json(user);
};

export const update = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const { email, fullName, avatar } = req.body;
  const user = await userService.updateUser(uid, { email, fullName, avatar });
  if (!user) {
    res.status(404).json({error: 'User not found'});
    return;
  }
  res.json(user);
};

export const getOne = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const user = await userService.getUserByUid(uid);
  if (!user) {
    res.status(404).json({ error: 'User is not found' });
    return;
  }
  res.json(user);
};