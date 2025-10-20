import { useMemo } from "react";
import { useGetGoalsQuery } from "../../../../../app/store/api/goalsApi"


export const useGetGoalById = (userId: string | undefined, goalId: string | undefined) => {
  const { data: goals = [] } = useGetGoalsQuery(userId || '', { skip: !userId });

  return useMemo(() => 
    goalId ? goals.find(goal => goal.id === goalId) : undefined,
    [goals, goalId] 
  )
}