import { createSelector } from "@reduxjs/toolkit";
import { selectAllCategories } from "./categorySelectors";
import { SelectAllTransactions } from "../../transactions/model/transactionsSelectors";


export const selectExpensesByCategory = createSelector(
  [SelectAllTransactions, selectAllCategories],
  (transactions, categories) => {

    const expenses = transactions.filter(tx => tx.type === 'expense');
    
    const expensesByCategory = expenses.reduce((acc, tx) => {
      const category = tx.category || 'Other';
      acc[category] = (acc[category] || 0) + Number(tx.amount);
      return acc;
    }, {} as Record<string, number>);
    
    const result = Object.entries(expensesByCategory).map(([name, value]) => {
      const categoryData = categories.find(cat => cat.name === name);
      return {
        name,
        value,
        color: categoryData?.color || '#888888'
      };
    });
    
    return result;
  }
);