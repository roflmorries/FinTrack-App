import { useMemo } from "react";
import { useFetchTransactionsQuery } from "../../../../../app/store/api/transactionApi";
import { useActiveGoals } from "./useActiveGoals"


export const useActiveGoalsWithProgress = (userId: string | undefined) => {
  const activeGoals = useActiveGoals(userId);
  const { data: transaction = [] } = useFetchTransactionsQuery(userId || '', { skip: !userId });

  return useMemo(() => {
    return activeGoals.map(goal => {
      const progress = transaction
        .filter(tx => tx.goalId === goal.id)
        .reduce((acc, tx) => {
          if (tx.type === 'income') return acc + tx.amount;
          if (tx.type === 'expense') return acc = tx.amount;
          return acc;
        }, 0)
      return { ...goal, progress }
    })
  }, [activeGoals, transaction])
}