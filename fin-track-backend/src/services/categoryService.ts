import { defaultCategories } from "../data/defaultCategories";
import { Category } from "../types";
import * as db from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from "../models/Category";


export const getCategoriesByUser = async (userId: string): Promise <Category[]> => {
  const found = await CategoryModel.find({ userId }).lean();
  return found.map(({ id, userId, name, color }) => ({
    id, userId, name, color
  }));
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise <Category> => {
  const newCategory = {
    id: uuidv4(),
    ...category
  };
  const created = await CategoryModel.create(newCategory);
  const { id, userId, name, color } = created.toObject();
  return { id, userId, name, color };
};

export const updateCategory = async (id: string, updates: Partial<Category>): Promise <Category | null> => {
  const updated = await CategoryModel.findOneAndUpdate({id}, updates, {new: true});
  if (!updated) return null;
  const { id: catId, userId, name, color } = updated.toObject();
  return { id: catId, userId, name, color };
};

export const deleteCategory = async (id: string): Promise <void >=> {
  await CategoryModel.deleteOne({ id });
};

export const createDefaultCategoriesForUser = async (userId: string): Promise <Category[]> => {
  const exists = await CategoryModel.exists({
    userId,
    name: { $in: defaultCategories.map(def => def.name) }
  });
  if (exists) return [];
  const newCategories = defaultCategories.map(categories => ({
    id: uuidv4(),
    userId,
    ...categories
  }));
  await CategoryModel.insertMany(newCategories);
  return newCategories
}