import { createAsyncThunk } from "@reduxjs/toolkit";
import { Goal } from "./types";
import axios from "axios";
import { API_URL } from "../../shared/config/config";

const API_URL_GOALS = `${API_URL}/goals`

export const fetchGoals = createAsyncThunk<Goal[], string>('goals/fetchAll',
  async (userId: string) => {
    const response = await axios.get<Goal[]>(`${API_URL_GOALS}?userId=${userId}`);
    return response.data
    }
);

export const createGoal = createAsyncThunk<Goal, Omit<Goal, 'id'>>('goals/create',
  async (goal) => {
    const response = await axios.post<Goal>(API_URL_GOALS, goal);
    return response.data;
  }
);

export const updateGoal = createAsyncThunk<Goal, {id: string, changes: Partial<Goal>}>('goals/update',
  async ({ id, changes }) => {
    const response = await axios.put<Goal>(`${API_URL_GOALS}/${id}`, changes);
    return response.data;
  }
);

export const deleteGoal = createAsyncThunk<string, string>('goals/delete',
  async id => {
    await axios.delete(`${API_URL_GOALS}/${id}`);
    return id;
  }
);