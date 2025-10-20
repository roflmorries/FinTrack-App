import { useMemo } from "react";
import { useGetCategoriesQuery } from "../../../../../app/store/api/categoryApi";
import { useFetchTransactionsQuery } from "../../../../../app/store/api/transactionApi";



export const useGetExpensesByCategory = (userId: string | undefined) => {
  const { data: transactions = [] } = useFetchTransactionsQuery(userId || '', { skip: !userId });
  const { data: categories = [] } = useGetCategoriesQuery(userId || '', { skip: !userId });

  return useMemo(() => {
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
  }, [transactions, categories])
}