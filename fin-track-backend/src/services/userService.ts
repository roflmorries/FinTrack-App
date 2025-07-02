import { User } from "../types";
import * as db from '../utils/db';

export const createUser = (user: User): User => {
  const data = db.read();
  data.users = data.users || [];
  data.users.push(user);
  db.write(data);
  return user;
};

export const updateUser = (uid: string, updates: Partial<User>): User | null => {
  const data = db.read();
  const idx = data.users.findIndex(user => user.uid === uid);
  if (idx === -1) return null;
  data.users[idx] = {...data.users[idx], ...updates };
  db.write(data);
  return data.users[idx];
}

export const getUserByUid = (uid: string) : User | null => {
  const data = db.read();
  return data.users.find(user => user.uid === uid) || null;
}