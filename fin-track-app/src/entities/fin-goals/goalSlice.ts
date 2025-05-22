import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Goal } from "./types";


export const goalAdapter = createEntityAdapter<Goal>();

const initialState = goalAdapter.getInitialState();

const goalSlice = createSlice({
  name: 'goals',
  initialState: initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Goal>) => {
      goalAdapter.addOne(state, action.payload);
    },
    updateGoal: (state, action: PayloadAction<{ id: string; changes: Partial<Goal> }>) => {
      goalAdapter.updateOne(state, action.payload);
    },
    deleteGoal: (state, action: PayloadAction<string>) => {
      goalAdapter.removeOne(state, action.payload);
    }
  }
})

export const { addGoal, updateGoal, deleteGoal } = goalSlice.actions;
export default goalSlice.reducer;