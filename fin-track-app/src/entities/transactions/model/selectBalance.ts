import { createSelector } from "@reduxjs/toolkit";
import { SelectAllTransactions } from "./transactionsSelectors";
import dayjs from "dayjs";


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

export const selectBalanceHistory = createSelector(
  [SelectAllTransactions],
  (transactions) => {
    const sorted = [...transactions].sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
    let balance = 0;
    const history: { date: string; balance: number }[] = [];
    sorted.forEach(tx => {
      if (tx.type === "income") balance += tx.amount;
      if (tx.type === "expense") balance -= tx.amount;
      history.push({ date: tx.date, balance });
    });
    return history;
  }
)