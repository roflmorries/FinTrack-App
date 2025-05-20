import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./types";


// export const saveCategoriesToStorage = createAsyncThunk('categories/saveToStorage',
//   async ({userId, categories}: {userId: string, categories: Category[]}) => {
//     localStorage.setItem(`categories_${userId}`, JSON.stringify(categories));
//     return categories;
//   }
// );

export const fetchCategories = createAsyncThunk('categories/FetchCategories',
  async (userId: string) => {
    const data = localStorage.getItem(`categories_${userId}`);
    return data ? (JSON.parse(data) as Category[]) : [];
  }
);

export const saveCategoriesToStorageMock = ({userId, categories} : { userId: string, categories: Category[] }) => {
  localStorage.setItem(`categories_${userId}`, JSON.stringify(categories));
}