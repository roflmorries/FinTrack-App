import { createSelector } from "@reduxjs/toolkit";
import { selectActiveGoals } from "./goalActiveSelector";
import { SelectAllTransactions } from "../transactions/model/transactionsSelectors";

export const selectActiveGoalsWithProgress = createSelector(
  [selectActiveGoals, SelectAllTransactions],
  (goals, transactions) =>
    goals.map(goal => {
      const progress = transactions
        .filter(tx => tx.goalId === goal.id)
        .reduce((acc, tx) => {
          if (tx.type === "income") return acc + tx.amount;
          if (tx.type === "expense") return acc - tx.amount;
          return acc;
        }, 0);
      return { ...goal, progress };
    })
);