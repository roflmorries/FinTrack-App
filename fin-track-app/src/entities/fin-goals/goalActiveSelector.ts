import { createSelector } from "@reduxjs/toolkit";
import { selectAllGoals } from "./goalSelectors";
import { SelectAllTransactions } from "../transactions/model/transactionsSelectors";
import dayjs from "dayjs";


export const selectActiveGoals = createSelector(
  [selectAllGoals, SelectAllTransactions],
  (goals, transactions) => goals.filter(goal => {
    const sum = transactions
      .filter(tx => tx.goalId === goal.id)
      .reduce((acc, tx) => acc + tx.amount, 0);
    const isCompleted = sum >= goal.amount;
    const isExpired = dayjs().isAfter(dayjs(goal.deadline))
    return !isCompleted && !isExpired
  })
)