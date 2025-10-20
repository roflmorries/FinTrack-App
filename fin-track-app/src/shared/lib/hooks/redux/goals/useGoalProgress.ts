import { useMemo } from "react";
import { useFetchTransactionsQuery } from "../../../../../app/store/api/transactionApi"

/**
 * Hook for calculation current progress toward a fin-goal
 * @param userId 
 * @param goalId 
 * @returns Amount of savings for the goals (income minus expenses)
 */


export const useGoalProgress = (userId: string | undefined, goalId: string | undefined) => {
  const { data: transactions = [] } = useFetchTransactionsQuery(userId || '', { skip: !userId || !goalId });

  return useMemo(() => {
    if (!goalId) return 0;

    return transactions
      .filter(tx => tx.goalId === goalId)
      .reduce((acc, tx) => {
        if (tx.type === 'income') return acc + tx.amount;
        if (tx.type === 'expense') return acc - tx.amount;
        return acc;
      }, 0)
  }, [transactions, goalId])
}