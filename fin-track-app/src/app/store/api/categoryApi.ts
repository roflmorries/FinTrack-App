import { Category } from "../../../entities/categories/model/types";
import { API_URL } from "../../../shared/config/config";
import { api } from "./api";

const API_URL_CATEGORIES = `${API_URL}/categories`

export const categoryApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<Category[], string>({
          query: (userId: string) => `${API_URL_CATEGORIES}?userId=${userId}`,
          providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Category' as const, id })),
                  { type: 'Category', id: 'LIST' },
                ]
              : [{ type: 'Category', id: 'LIST' }],
        }),
        createCategory: builder.mutation<Category, Omit<Category, 'id'>>({
          query: (category) => ({
            url: API_URL_CATEGORIES,
            method: 'POST',
            body: category
          }),
          invalidatesTags: [{ type: 'Category', id: 'LIST' }]
        }),
        updateCategory: builder.mutation<Category, { id: string, changes: Partial<Category> }>({
          query: ({ id, changes }) => ({
            url: `${API_URL_CATEGORIES}/${id}`,
            method: 'PUT',
            body: changes
          }),
          invalidatesTags: (result, error, {id}) => [{ type: 'Category', id }]
        }),
        deleteCategory: builder.mutation<string, string>({
          query: id => ({
            url: `${API_URL_CATEGORIES}/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: (result, error, id) => [{ type: 'Category', id }]
        }),
  })
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi; 