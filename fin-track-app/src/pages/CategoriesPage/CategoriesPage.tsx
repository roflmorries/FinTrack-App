import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { selectAllCategories } from "../../entities/categories/model/categorySelectors";
import { useState } from "react";
import CategoriesList from "../../features/categories/CategoriesList";
import { Modal } from "antd";
import CategoryForm from "../../features/categories/CategoryForm";
import { deleteCategory } from "../../entities/categories/model/categorySlice";

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
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

  const handleTransactionEdit = (categoryId: string) => {
    setIsEditModalShown(true)
    setEditCategoryId(categoryId)
  }

  const handleTransactionDelete = (categoryId: string) => {
    dispatch(deleteCategory(categoryId));
  }

  const handleCloseModal = () => {
    setIsEditModalShown(false)
  }

  return (
    <Layout>
      <div>TransactionPage</div>
      <CategoryForm onSave={handleCloseModal}/>
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