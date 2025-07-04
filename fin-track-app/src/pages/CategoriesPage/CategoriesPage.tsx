import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { selectAllCategories } from "../../entities/categories/model/categorySelectors";
import { useState } from "react";
import CategoriesList from "../../features/categories/CategoriesList";
import { Button, Modal } from "antd";
import CategoryForm from "../../features/categories/CategoryForm";
import { deleteCategory } from "../../entities/categories/model/categoryThunk";

const Layout = styled.div`
  background-color: #141414;
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  margin: 20px;
`

export default function CategoriesPage() {
  const data = useAppSelector(selectAllCategories)
  const dispatch = useAppDispatch();
  // const [isAddFormShown, setIsAddFormShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

  const handleTransactionEdit = (categoryId: string) => {
    setIsEditModalShown(true)
    setEditCategoryId(categoryId)
  }

  const handleTransactionDelete = async (categoryId: string) => {
    await dispatch(deleteCategory(categoryId));
  }

  const handleCloseModal = () => {
    setIsEditModalShown(false)
    setIsNewModalShown(false)
  }

  return (
    <Layout>
      <div>TransactionPage</div>
      <Button type="primary" onClick={() => setIsNewModalShown(true)}>Create new category</Button>
      <Modal
      open={isNewModalShown}
      onCancel={handleCloseModal}
      destroyOnClose // mb delete
      footer={null}
      >
        <CategoryForm onSave={handleCloseModal}/>
      </Modal>
      <CategoriesList items={data} onEdit={handleTransactionEdit} onDelete={handleTransactionDelete}/>
      <Modal
      title='edit form'
      open={isEditModalShown}
      onCancel={handleCloseModal}
      destroyOnClose // mb delete
      footer={null}
      >
        <CategoryForm categoryId={editCategoryId ?? undefined} onSave={handleCloseModal}/>
      </Modal>
    </Layout>
  )
}