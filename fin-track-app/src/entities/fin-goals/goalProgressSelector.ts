import { createSelector } from "@reduxjs/toolkit";
import { SelectAllTransactions } from "../transactions/model/transactionsSelectors";

export const selectGoalProgress = createSelector(
  [
    SelectAllTransactions,
    (_: any, goalId: string) => goalId
  ],
  (transactions, goalId) =>
    transactions
      .filter(tx => tx.goalId === goalId)
      .reduce((acc, tx) => {
        if (tx.type === "income") return acc + tx.amount;
        if (tx.type === "expense") return acc - tx.amount;
        return acc;
      }, 0)
);