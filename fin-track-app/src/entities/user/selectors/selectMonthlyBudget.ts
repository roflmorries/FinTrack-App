import { RootState } from "../../../app/store/store";

export const selectMonthlyBudget = (state: RootState) =>
  state.user.currentUser?.monthlyBudget ?? 0;