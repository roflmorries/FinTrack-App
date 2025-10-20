import { useMemo } from "react";
import { useGetGoalsQuery } from "../../../../../app/store/api/goalsApi"
import { useFetchTransactionsQuery } from "../../../../../app/store/api/transactionApi";
import dayjs from "dayjs";


export const useSelectActiveGoals = (userId: string | undefined) => {
  const { data: goals = [] } = useGetGoalsQuery(userId || '', { skip: !userId });
  const { data: transactions = [] } = useFetchTransactionsQuery(userId || '', { skip: !userId });

  return useMemo(() => {
    return goals.filter(goal => {
      const sum = transactions
        .filter(tx => tx.goalId === goal.id)
        .reduce((acc, tx) => {
          if (tx.type === 'income') return acc + tx.amount;
          if (tx.type === 'expense') return acc - tx.amount;
          return acc;
        }, 0);

        const isCompleted = sum >= goal.amount;
        const isExpired = dayjs().isAfter(dayjs(goal.deadline));

        return !isCompleted && !isExpired;
    })
  }, [goals, transactions])
}