import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./types";
import { API_URL } from "../../../shared/config/config";
import axios from "axios";

const API_URL_CATEGORIES = `${API_URL}/categories`


export const fetchCategories = createAsyncThunk<Category[], string>('categories/fetchAll',
  async (userId) => {
    const response = await axios.get<Category[]>(`${API_URL_CATEGORIES}?userId=${userId}`);
    return response.data;
  }
);

export const createCategory = createAsyncThunk<Category, Omit<Category, 'id'>>('categories/create',
  async (category) => {
    const response = await axios.post<Category>(API_URL_CATEGORIES, category);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk<Category, {id: string, changes: Partial<Category>}>('categories/update',
  async ({id, changes}) => {
    const response = await axios.put<Category>(`${API_URL_CATEGORIES}/${id}`, changes);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk<string, string>('categories/delete',
  async id => {
    await axios.delete(`${API_URL_CATEGORIES}/${id}`);
    return id;
  }
);