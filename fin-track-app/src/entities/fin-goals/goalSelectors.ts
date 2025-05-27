import { RootState } from "../../app/store/store";
import { goalAdapter } from "./goalSlice";

export const {
  selectAll: selectAllGoals,
  selectById: selectGoalById
} = goalAdapter.getSelectors((state: RootState) => state.goal);