import React from 'react'
import { Transaction } from '../../entities/transactions/model/types'
import styled from 'styled-components';
import { Button } from 'antd';

type TransactionCardProps = Transaction & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  p {
    color: white;
  }
`

export default function TransactionCard({ onEdit, onDelete, ...transaction }: TransactionCardProps) {
  return (
    <StyledContainer>
      <p>Type: {transaction.type}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Category: {transaction.category}</p>
      <p>Data: {transaction.date}</p>
      {transaction.comment && <p>Comment: {transaction.comment}</p>}
      <div>
        <Button type='primary' onClick={() => onEdit(transaction.id)}>Edit</Button>
        <Button type='primary' onClick={() => onDelete(transaction.id)}>Delete</Button>
      </div>
    </StyledContainer>
  )
}