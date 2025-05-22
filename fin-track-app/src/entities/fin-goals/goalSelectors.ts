import { goalAdapter } from "./goalSlice";

export const {
  selectAll: selectAllGoals,
  selectById: selectGoalById
} = goalAdapter.getSelectors((state: any) => state.goals);