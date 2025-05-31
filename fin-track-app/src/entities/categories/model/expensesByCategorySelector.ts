import { createSelector } from "@reduxjs/toolkit";
import { selectAllCategories } from "./categorySelectors";
import { SelectAllTransactions } from "../../transactions/model/transactionsSelectors";


export const selectExpensesByCategory = createSelector(
  [SelectAllTransactions, selectAllCategories],
  (transactions, categories) => {
    const expenses = transactions.filter(tx => tx.type === 'expense');
    return categories.map(category => {
      const value = expenses
        .filter(tx => tx.category === category.name)
        .reduce((sum, tx) => sum + tx.amount, 0);
        return {
          name: category.name,
          value,
          color: category.color
        };
    }).filter(item => item.value > 0)
  }
)