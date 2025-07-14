import { User } from "../types";
import * as db from '../utils/db';
import { UserModel } from "../models/User";

export const createUser = async (user: User): Promise<User> => {
  const { uid, email, fullName, avatar, monthlyBudget } = await UserModel.create(user);
  return { uid, email, fullName, avatar, monthlyBudget: monthlyBudget ?? undefined  };
};

export const updateUser = async (uid: string, updates: Partial<User>): Promise<User | null> => {
  const updated = await UserModel.findOneAndUpdate({uid}, updates, {new: true});
  if (!updated) return null;
  const { uid: u, email, fullName, avatar, monthlyBudget } = updated.toObject();
  return { uid: u, email, fullName, avatar, monthlyBudget: monthlyBudget ?? undefined  };
}
export const getUserByUid = async (uid: string) => {
  const found = await UserModel.findOne({uid});
  if (!found) return null;
  const { uid: u, email, fullName, avatar, monthlyBudget } = found.toObject();
  return { uid: u, email, fullName, avatar, monthlyBudget };
}