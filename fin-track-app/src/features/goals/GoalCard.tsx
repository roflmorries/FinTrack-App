import styled from 'styled-components'
import { Goal } from '../../entities/fin-goals/types'
import { Button } from 'antd'

type GoalCardProps = Goal & {
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  p {
    color: white
  }
  .buttons__container {
    gap: 15px;
    display: flex;
  }
`

export default function GoalCard({onEdit, onDelete, ...goal}: GoalCardProps) {
  return (
    <StyledContainer>
    <p>Name: {goal.name}</p>
    <p>Amount: {goal.amount}</p>
    <p>Deadline: {goal.deadline}</p>
    <div className='buttons__container'>
      <Button type='primary' onClick={() => onEdit(goal.id)}>Edit</Button>
      <Button type='primary' onClick={() => onDelete(goal.id)}>Delete</Button>
    </div>
    </StyledContainer>
  )
}