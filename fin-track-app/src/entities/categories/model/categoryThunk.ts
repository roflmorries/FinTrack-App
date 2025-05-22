import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./types";
import { defaultCategories } from "./defaultCategories";
import { v4 as uuidv4 } from 'uuid';


// export const saveCategoriesToStorage = createAsyncThunk('categories/saveToStorage',
//   async ({userId, categories}: {userId: string, categories: Category[]}) => {
//     localStorage.setItem(`categories_${userId}`, JSON.stringify(categories));
//     return categories;
//   }
// );

export const fetchCategories = createAsyncThunk('categories/FetchCategories',
  async (userId: string) => {
    const data = localStorage.getItem(`categories_${userId}`);
    if (data) {
      return JSON.parse(data) as Category[];
    } else {
      const categories: Category[] = defaultCategories.map(category => ({
        ...category,
        id: uuidv4(),
        userId,
      }));
      localStorage.setItem(`categories${userId}`, JSON.stringify(categories));
      return categories;
    }
  }
);

export const saveCategoriesToStorageMock = ({userId, categories} : { userId: string, categories: Category[] }) => {
  localStorage.setItem(`categories_${userId}`, JSON.stringify(categories));
}