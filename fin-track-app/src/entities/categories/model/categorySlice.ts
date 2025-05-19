import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./types";


export const categoryAdapter = createEntityAdapter<Category>();

const initialState = categoryAdapter.getInitialState({
  loading: false,
  error: null as string | null
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      categoryAdapter.addOne(state, action.payload);
    },
    updateCategory: (state, action: PayloadAction<{ id: string; changes: Partial<Category> }>) => {
      categoryAdapter.updateOne(state, action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      categoryAdapter.removeOne(state, action.payload);
    },
    setAllCategories: (state, action: PayloadAction<Category[]>) => {
      categoryAdapter.setAll(state, action.payload);
    }
  },
  // extraReducers: {

  // }
})

export const {addCategory, updateCategory, deleteCategory, setAllCategories} = categorySlice.actions;

export default categorySlice.reducer;