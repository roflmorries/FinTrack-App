import { useMemo } from "react";
import { useGetCategoriesQuery } from "../../../../../app/store/api/categoryApi";


export const useGetCategoryById = (userId: string | undefined, categoryId: string | undefined) => {
  const { data: categories = [] } = useGetCategoriesQuery(userId || '', { skip: !userId });

  return useMemo(() => {
    categoryId ? categories.find(category => category.id === categoryId) : undefined;
  }, [categories, categoryId])
}