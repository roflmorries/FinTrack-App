import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./types";
import { fetchCategories, saveCategoriesToStorageMock } from "./categoryThunk";


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
      saveCategoriesToStorageMock({
        userId: action.payload.userId,
        categories: Object.values(state.entities)
      });
    },
    updateCategory: (state, action: PayloadAction<{ id: string; changes: Partial<Category> }>) => {
      categoryAdapter.updateOne(state, action.payload);
      const updated = state.entities[action.payload.id];
      if (updated) {
        saveCategoriesToStorageMock({
          userId: updated.userId,
          categories: Object.values(state.entities),
        })
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const userId = state.entities[id]?.userId;
      categoryAdapter.removeOne(state, id);
      if (userId) {
        saveCategoriesToStorageMock({
          userId,
          categories: Object.values(state.entities)
        })
      }
    },
    setAllCategories: (state, action: PayloadAction<Category[]>) => {
      categoryAdapter.setAll(state, action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        categoryAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = 'failed to fetch categories'
      })
  }
})

export const {addCategory, updateCategory, deleteCategory, setAllCategories} = categorySlice.actions;

export default categorySlice.reducer;