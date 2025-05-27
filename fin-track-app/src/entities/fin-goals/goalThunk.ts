import { createAsyncThunk } from "@reduxjs/toolkit";
import { Goal } from "./types";


export const fetchGoals = createAsyncThunk<Goal[], string>('goals/fetchAll',
  async (userId: string) => {
    const data = localStorage.getItem(`goals_${userId}`);
    return data ? JSON.parse(data) : []
    }
);


export const saveGoalToStorageMock = ({userId, goals}: {userId: string, goals: Goal[]}) => {
  localStorage.setItem(`goals_${userId}`, JSON.stringify(goals))
}