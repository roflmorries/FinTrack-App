import styled from "styled-components"
import GoalForm from "../../features/goals/GoalForm"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import GoalsList from "../../features/goals/GoalsList";
import { selectAllGoals } from "../../entities/fin-goals/goalSelectors";

type Props = {}

const Layout = styled.div`
  background-color: #141414;
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  margin: 20px;
  * {
    color: white;
  }
`

export default function GoalsPage({}: Props) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllGoals)
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editGoalId, setEditGoalId] = useState<string | null>(null);

  const handleGoalEdit = (goalId: string) => {
    setIsEditModalShown(true)
    setEditGoalId(goalId)
  }

  const handleGoalDelete = (goalId: string) => {
    // dispatch();
  }

  const handleCloseModal = () => {
    setIsEditModalShown(false)
  }

  return (
    <Layout>
      <div>GoalsPage</div>
      <GoalForm/>
      <GoalsList items={data} onEdit={handleGoalEdit} onDelete={handleGoalDelete}/>
    </Layout>
  )
}