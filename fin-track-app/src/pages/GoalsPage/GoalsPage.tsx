import GoalForm from "../../features/goals/GoalForm"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import GoalsList from "../../features/goals/GoalsList";
import { selectAllGoals } from "../../entities/fin-goals/goalSelectors";
import { deleteGoal } from "../../entities/fin-goals/goalThunk";
import { Close } from "@mui/icons-material";
import { Layout, CreateButton, StyledDialog, StyledDialogTitle, StyledIconButton, StyledDialogContent } from "../../shared/ui/Goals/GoalPage.styled";

type Props = {}


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
    setEditGoalId(null)
  }

  return (
    <Layout>
      <CreateButton 
        variant="outlined" 
        onClick={() => setIsNewModalShown(true)}
      >
        Create New Goal
      </CreateButton>

      <StyledDialog
        open={isNewModalShown}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>
          Create New Goal
          <StyledIconButton onClick={handleCloseModal}>
            <Close />
          </StyledIconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <GoalForm onSave={handleCloseModal}/>
        </StyledDialogContent>
      </StyledDialog>

      <GoalsList items={data} onEdit={handleGoalEdit} onDelete={handleGoalDelete}/>

      <StyledDialog
        open={isEditModalShown}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>
          Edit Goal
          <StyledIconButton onClick={handleCloseModal}>
            <Close />
          </StyledIconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <GoalForm goalId={editGoalId ?? undefined} onSave={handleCloseModal}/>
        </StyledDialogContent>
      </StyledDialog>
    </Layout>
  )
}