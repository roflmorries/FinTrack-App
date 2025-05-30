import styled from "styled-components"
import TransactionForm from "../../features/transactions/TransactionForm"
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"
import { SelectAllTransactions } from "../../entities/transactions/model/transactionsSelectors"
import TransactionsList from "../../features/transactions/TransactionsList"
import { Modal } from "antd"
import { useState } from "react"
import { deleteTransaction } from "../../entities/transactions/model/transactionSlice"

const Layout = styled.div`
  background-color: #141414;
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  margin: 20px;
`

export default function TransactionPage() {
  const data = useAppSelector(SelectAllTransactions)
  const dispatch = useAppDispatch();
  // const [isAddFormShown, setIsAddFormShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState<string | null>(null);

  const handleTransactionEdit = (transactionId: string) => {
    setIsEditModalShown(true)
    setEditTransactionId(transactionId)
  }

  const handleTransactionDelete = (transactionId: string) => {
    dispatch(deleteTransaction(transactionId));
  }

  const handleCloseModal = () => {
    setIsEditModalShown(false)
  }

  return (
    <Layout>
      <div>TransactionPage</div>
      <TransactionsList onEdit={handleTransactionEdit} onDelete={handleTransactionDelete}/>
      <Modal
      title='edit form'
      open={isEditModalShown}
      onCancel={handleCloseModal}
      destroyOnClose // mb delete
      >
        <TransactionForm transactionId={editTransactionId ?? undefined} onSave={handleCloseModal}/>
      </Modal>
    </Layout>
  )
}