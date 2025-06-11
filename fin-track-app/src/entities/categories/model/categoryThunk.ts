import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./types";
import { API_URL } from "../../../shared/config/config";
import axios from "axios";




// export const fetchCategories = createAsyncThunk('categories/FetchCategories',
//   async (userId: string) => {
//     const data = localStorage.getItem(`categories_${userId}`);
//     if (data) {
//       return JSON.parse(data) as Category[];
//     } else {
//       const categories: Category[] = defaultCategories.map(category => ({
//         ...category,
//         id: uuidv4(),
//         userId,
//       }));
//       localStorage.setItem(`categories${userId}`, JSON.stringify(categories));
//       return categories;
//     }
//   }
// );

// export const saveCategoriesToStorageMock = ({userId, categories} : { userId: string, categories: Category[] }) => {
//   localStorage.setItem(`categories_${userId}`, JSON.stringify(categories));
// }

export const fetchCategories = createAsyncThunk<Category[], string>('categories/fetchAll',
  async (userId) => {
    const response = await axios.get<Category[]>(`${API_URL}?userId=${userId}`);
    return response.data;
  }
);

export const createCategory = createAsyncThunk<Category, Omit<Category, 'id'>>('categories/create',
  async (category) => {
    const response = await axios.post<Category>(API_URL, category);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk<Category, {id: string, changes: Partial<Category>}>('categories/update',
  async ({id, changes}) => {
    const response = await axios.put<Category>(`${API_URL}/${id}`, changes);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk<string, string>('categories/delete',
  async id => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);