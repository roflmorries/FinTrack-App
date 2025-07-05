import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./types";
import { API_URL } from "../../../shared/config/config";
import { api } from "../../../shared/api/axiosWithAuth";

const API_URL_CATEGORIES = `${API_URL}/categories`


export const fetchCategories = createAsyncThunk<Category[], string>('categories/fetchAll',
  async (userId) => {
    const response = await api.get<Category[]>(`${API_URL_CATEGORIES}?userId=${userId}`);
    return response.data;
  }
);

export const createCategory = createAsyncThunk<Category, Omit<Category, 'id'>>('categories/create',
  async (category) => {
    const response = await api.post<Category>(API_URL_CATEGORIES, category);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk<Category, {id: string, changes: Partial<Category>}>('categories/update',
  async ({id, changes}) => {
    const response = await api.put<Category>(`${API_URL_CATEGORIES}/${id}`, changes);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk<string, string>('categories/delete',
  async id => {
    await api.delete(`${API_URL_CATEGORIES}/${id}`);
    return id;
  }
);