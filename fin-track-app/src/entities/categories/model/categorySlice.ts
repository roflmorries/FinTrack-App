import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./types";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "./categoryThunk";


export const categoryAdapter = createEntityAdapter<Category>();

const initialState = categoryAdapter.getInitialState({
  loading: false,
  error: null as string | null
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
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

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        categoryAdapter.addOne(state, action.payload);
      })
      .addCase(createCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.rejected, state => {
        state.loading = false;
        state.error = 'Failed to create category'
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        categoryAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        })
      })
      .addCase(updateCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.rejected, state => {
        state.loading = false;
        state.error = 'Failed to update category'
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        categoryAdapter.removeOne(state, action.payload)
      })
      .addCase(deleteCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, state => {
        state.loading = false;
        state.error = 'Failed to delete category'
      })
  }
})

// export const {setAllCategories} = categorySlice.actions;

export default categorySlice.reducer;