import styled from 'styled-components'
import { Goal } from '../../entities/fin-goals/types'
import { Button, Popover } from 'antd'
import { useState } from 'react'

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
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <StyledContainer>
    <p>Name: {goal.name}</p>
    <p>Amount: {goal.amount}</p>
    <p>Deadline: {goal.deadline}</p>
    <div className='buttons__container'>
      <Button type='primary' onClick={() => onEdit(goal.id)}>Edit</Button>
      {/* <Button type='primary' onClick={() => onDelete(goal.id)}>Delete</Button> */}
      <Popover
      content={
        <>
        <p>Удаление цели не повлияет на ваши транзакции и баланс.</p>
        <Button type='primary' onClick={() => onDelete(goal.id)}>Delete</Button>
        <Button onClick={hide}>Close</Button>
        </>
      }
      title="Title"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">Delete</Button>
    </Popover>

    </div>
    </StyledContainer>
  )
}