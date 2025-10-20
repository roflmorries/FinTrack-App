import { Goal } from "../../../entities/fin-goals/types";
import { API_URL_GOALS } from "../../../shared/config/config";
import { api } from "./api";


export const goalsApi = api.injectEndpoints({
  endpoints: builder => ({
    getGoals: builder.query<Goal[], string>({
      query: (userId: string) => `${API_URL_GOALS}?userId=${userId}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Goal' as const, id })),
            { type: 'Goal', id: 'LIST' },
          ]
          : [{ type: 'Goal', id: 'LIST' }],
    }),
    createGoal: builder.mutation<Goal, Omit<Goal, 'id'>>({
      query: (goal) => ({
        url: API_URL_GOALS,
        method: 'POST',
        body: goal
      }),
      invalidatesTags: [{ type: 'Goal', id: 'LIST' }]
    }),
    updateGoal: builder.mutation<Goal, { id: string, changes: Partial<Goal> }>({
      query: ({ id, changes }) => ({
        url: `${API_URL_GOALS}/${id}`,
        method: 'PUT',
        body: changes
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Goal', id }]
    }),
    deleteGoal: builder.mutation<string, string>({
      query: id => ({
        url: `${API_URL_GOALS}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Goal', id }]
    }),
  })
});

export const {
  useGetGoalsQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation
} = goalsApi;