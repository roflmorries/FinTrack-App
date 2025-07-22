import styled from "styled-components"
import TransactionForm from "../../features/transactions/TransactionForm"
import { useAppDispatch } from "../../shared/lib/hooks/redux/reduxTypes"
import TransactionsList from "../../features/transactions/TransactionsList"
import { useState } from "react"
import { deleteTransaction } from "../../entities/transactions/model/transactionThunk"
import { Button, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const Layout = styled.div`
`

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: black !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 24px !important;
    color: #fff !important;
    min-width: 600px !important;
    max-width: 800px !important;
    
    @media (max-width: 768px) {
      min-width: 90% !important;
      margin: 16px !important;
    }
  }
  
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.7) !important;
    backdrop-filter: blur(4px) !important;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  padding: 20px 24px 16px 24px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
`;

const StyledDialogContent = styled(DialogContent)`
  padding: 24px !important;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.7) !important;
  padding: 8px !important;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
  }
`;

const CreateButton = styled(Button)`
  border-radius: 24px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  margin-bottom: 24px !important;
  
  &:hover {
    background: rgba(59, 130, 246, 0.25) !important;
    border-color: #3b82f6 !important;
    color: #3b82f6 !important;
    transform: translateY(-2px);
  }
  
  transition: all 0.3s ease !important;
`;

const PageTitle = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '💰';
    font-size: 28px;
  }
`;

const PageContainer = styled.div`
  padding: 24px;
`;

export default function TransactionPage() {
  const dispatch = useAppDispatch();
  const [isCreateModalShown, setIsCreateModalShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState<string | null>(null);

  const handleTransactionEdit = (transactionId: string) => {
    setIsEditModalShown(true);
    setEditTransactionId(transactionId);
  }

  const handleTransactionDelete = async (transactionId: string) => {
    await dispatch(deleteTransaction(transactionId));
  }

  const handleCloseModal = () => {
    setIsEditModalShown(false);
    setIsCreateModalShown(false);
    setEditTransactionId(null); // ✅ Очищаем ID при закрытии
  }

  return (
    <Layout>
      <PageContainer>
        <PageTitle>Transactions</PageTitle>
        
        <CreateButton 
          variant="outlined" 
          onClick={() => setIsCreateModalShown(true)}
        >
          Create New Transaction
        </CreateButton>
        
        {/* Модалка создания транзакции */}
        <StyledDialog
          open={isCreateModalShown}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <StyledDialogTitle>
            Create New Transaction
            <StyledIconButton onClick={handleCloseModal}>
              <Close />
            </StyledIconButton>
          </StyledDialogTitle>
          <StyledDialogContent>
            <TransactionForm onSave={handleCloseModal} />
          </StyledDialogContent>
        </StyledDialog>

        <TransactionsList 
          onEdit={handleTransactionEdit} 
          onDelete={handleTransactionDelete}
        />

        {/* Модалка редактирования транзакции */}
        <StyledDialog
          open={isEditModalShown}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <StyledDialogTitle>
            Edit Transaction
            <StyledIconButton onClick={handleCloseModal}>
              <Close />
            </StyledIconButton>
          </StyledDialogTitle>
          <StyledDialogContent>
            <TransactionForm 
              transactionId={editTransactionId ?? undefined} 
              onSave={handleCloseModal}
            />
          </StyledDialogContent>
        </StyledDialog>
      </PageContainer>
    </Layout>
  )
}