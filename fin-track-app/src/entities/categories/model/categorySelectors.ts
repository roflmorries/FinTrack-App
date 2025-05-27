import { RootState } from "../../../app/store/store";
import { categoryAdapter } from "./categorySlice"

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds
} = categoryAdapter.getSelectors((state: RootState) => state.category);