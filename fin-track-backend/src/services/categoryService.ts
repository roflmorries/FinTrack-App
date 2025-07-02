import { defaultCategories } from "../data/defaultCategories";
import { Category } from "../types";
import * as db from '../utils/db';
import { v4 as uuidv4 } from 'uuid';


export const getCategoriesByUser = (userId: string): Category[] => {
  const data = db.read();
  return data.categories.filter(category => category.userId === userId);
};

export const createCategory = (category: Omit<Category, 'id'>): Category => {
  const data = db.read();
  const newCategory = {
    id: uuidv4(),
    ...category
  }
  data.categories.push(newCategory);
  db.write(data);
  return newCategory;
};

export const updateCategory = (id: string, updates: Partial<Category>): Category | null => {
  const data = db.read();
  const idx = data.categories.findIndex(category => category.id === id);
  if (idx === -1) return null;
  data.categories[idx] = {
    ...data.categories[idx],
    ...updates
  }
  db.write(data)
  return data.categories[idx];
};

export const deleteCategory = (id: string): void => {
  const data = db.read();
  data.categories = data.categories.filter(category => category.id !== id);
  db.write(data);
};

export const createDefaultCategoriesForUser = (userId: string) => {
  const data = db.read();
  const newCategories = defaultCategories.map(categories => ({
    id: uuidv4(),
    userId,
    ...categories
  }));
  data.categories.push(...newCategories);
  db.write(data);
  return newCategories;
}