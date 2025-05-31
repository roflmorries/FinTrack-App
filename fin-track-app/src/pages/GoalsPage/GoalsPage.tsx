import styled from "styled-components"
import GoalForm from "../../features/goals/GoalForm"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import GoalsList from "../../features/goals/GoalsList";
import { selectAllGoals } from "../../entities/fin-goals/goalSelectors";
import { deleteGoal } from "../../entities/fin-goals/goalSlice";
import { Button, Modal } from "antd";

type Props = {}

const Layout = styled.div`
  background-color: #141414;
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  margin: 20px;
`

export default function GoalsPage({}: Props) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllGoals)
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [editGoalId, setEditGoalId] = useState<string | null>(null);

  const handleGoalEdit = (goalId: string) => {
    setIsEditModalShown(true)
    setEditGoalId(goalId)
  }

  const handleGoalDelete = (goalId: string) => {
    dispatch(deleteGoal(goalId));
  }

  const handleCloseModal = () => {
    setIsEditModalShown(false)
    setIsNewModalShown(false)
  }

  return (
    <Layout>
      <div>GoalsPage</div>
      <Button type="primary" onClick={() => setIsNewModalShown(true)}>Create new Goal</Button>
      <Modal
      title='new form'
      open={isNewModalShown}
      onCancel={handleCloseModal}
      destroyOnClose // mb delete
      footer={null}
      >
        <GoalForm onSave={handleCloseModal}/>
      </Modal>
      <GoalsList items={data} onEdit={handleGoalEdit} onDelete={handleGoalDelete}/>

      <Modal
      title='edit form'
      open={isEditModalShown}
      onCancel={handleCloseModal}
      destroyOnClose // mb delete
      footer={null}
      >
        <GoalForm goalId={editGoalId ?? undefined} onSave={handleCloseModal}/>
      </Modal>
    </Layout>
  )
}