import { Goal } from '../../entities/fin-goals/types'

type GoalCardProps = Goal & {
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
}

export default function GoalCard({onEdit, onDelete, ...goal}: GoalCardProps) {
  return (
    <>
    <p>Name: {goal.name}</p>
    <p>Amount: {goal.amount}</p>
    <p>Deadline: {goal.deadline}</p>
    </>
  )
}