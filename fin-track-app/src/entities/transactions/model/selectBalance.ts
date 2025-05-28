import { createSelector } from "@reduxjs/toolkit";
import { SelectAllTransactions } from "./transactionsSelectors";


export const selectBalance = createSelector(
  [SelectAllTransactions],
  (transactions) => 
    transactions.reduce((acc, tx) => {
      if (tx.type === 'income') return acc + tx.amount;
      if (tx.type === 'expense') return acc - tx.amount;
      return acc
    }, 0)
)

export const selectGoalsReserved = createSelector(
  [SelectAllTransactions],
  (transactions) =>
    transactions
      .filter(tx => !!tx.goalId)
      .reduce((acc, tx) => {
        if (tx.type === "income") return acc + tx.amount;
        if (tx.type === "expense") return acc - tx.amount;
        return acc;
      }, 0)
);

export const selectFreeBalance = createSelector(
  [selectBalance, selectGoalsReserved],
  (total, reserved) => total - reserved
)