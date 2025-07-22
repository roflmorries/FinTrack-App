import { Transaction } from '../../entities/transactions/model/types'
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type TransactionCardProps = Transaction & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateX(4px);
  }
  
  p {
    color: white;
    margin: 0;
    font-size: 14px;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled(IconButton)<{ $variant: 'edit' | 'delete' }>`
  width: 36px !important;
  height: 36px !important;
  border-radius: 8px !important;
  padding: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  
  ${({ $variant }) => $variant === 'edit' ? `
    background: rgba(255, 149, 0, 0.15) !important;
    color: #FF9500 !important;
    
    &:hover {
      background: rgba(255, 149, 0, 0.25) !important;
      border-color: #FF9500 !important;
      color: #FF9500 !important;
      transform: translateY(-1px);
    }
  ` : `
    background: rgba(255, 59, 48, 0.15) !important;
    color: #FF3B30 !important;
    
    &:hover {
      background: rgba(255, 59, 48, 0.25) !important;
      border-color: #FF3B30 !important;
      color: #FF3B30 !important;
      transform: translateY(-1px);
    }
  `}
  
  transition: all 0.3s ease !important;
  
  .MuiSvgIcon-root {
    font-size: 18px !important;
  }
`;

export default function TransactionCard({ onEdit, onDelete, ...transaction }: TransactionCardProps) {
  return (
    <StyledContainer>
      <TransactionInfo>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>Amount:</strong> ${transaction.amount}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        {transaction.comment && <p><strong>Comment:</strong> {transaction.comment}</p>}
      </TransactionInfo>
      
      <ButtonGroup>
        <ActionButton 
          $variant="edit"
          onClick={() => onEdit(transaction.id)}
          size="small"
        >
          <EditIcon fontSize="small" />
        </ActionButton>
        <ActionButton 
          $variant="delete"
          onClick={() => onDelete(transaction.id)}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </ActionButton>
      </ButtonGroup>
    </StyledContainer>
  )
}