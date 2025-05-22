import React from 'react'
import { Goal } from '../../entities/fin-goals/types'
import GoalCard from './GoalCard'

type GoalsListProps = {
  items: Goal[],
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
}

export default function GoalsList({ items, onEdit, onDelete }: GoalsListProps) {
  return (
    <>
      {items.map(item => (
        <GoalCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item}/>
      ))}
    </>
  )
}