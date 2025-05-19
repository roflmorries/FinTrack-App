import { categoryAdapter } from "./categorySlice"

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds
} = categoryAdapter.getSelectors((state: any) => state.category);