import { Request, Response } from "express";
import * as userService from '../services/userService';
import * as categoryService from '../services/categoryService';
import * as db from '../utils/db';

export const create = (req: Request, res: Response) => {
  const { uid, email, fullName, avatar } = req.body;
  if (!uid || !email) {
    res.status(400).json({ error: 'Missed required fields' });
    return;
  };
  const data = db.read();
  const exists = data.users.find(user => user.uid === uid);
  if (exists) {
    res.status(409).json({error: 'User already exists'});
    return;
  }
  const user = userService.createUser({ uid, email, fullName, avatar });
  categoryService.createDefaultCategoriesForUser(uid);
  res.json(user);
};

export const update = (req: Request, res: Response) => {
  const { uid } = req.params;
  const { email, fullName, avatar } = req.body;
  const user = userService.updateUser(uid, { email, fullName, avatar });
  res.json(user);
};

export const getOne = (req: Request, res: Response) => {
  const { uid } = req.params;
  const user = userService.getUserByUid(uid);
  if (!user) res.status(400).json({ error: 'User is not found' });
  res.json(user);
};