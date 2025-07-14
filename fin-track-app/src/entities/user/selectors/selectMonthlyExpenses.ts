import dayjs from "dayjs";
import { SelectAllTransactions } from "../../transactions/model/transactionsSelectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectMonthlyExpenses = createSelector(
  [SelectAllTransactions],
  (transactions) => {
    const now = dayjs();
    const month = now.month();
    const year = now.year();
    return transactions
      .filter(tx => 
        tx.type === 'expense' &&
        dayjs(tx.date).month() === month &&
        dayjs(tx.date).year() === year
      )
      .reduce((sum, tx) => sum + tx.amount, 0)
  }
)