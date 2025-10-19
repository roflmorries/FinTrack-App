import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { useState } from "react";
import CategoriesList from "../../features/categories/CategoriesList";
import CategoryForm from "../../features/categories/CategoryForm";
import { Close } from "@mui/icons-material";
import { Layout, PageTitle, CreateButton, StyledDialog, StyledDialogTitle, StyledIconButton, StyledDialogContent } from "../../shared/ui/Category/categoryPage.styled";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../app/store/api/categoryApi";


export default function CategoriesPage() {
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  const { data = [] } = useGetCategoriesQuery(userId || '', { skip: !userId });
  const [deleteCategory] = useDeleteCategoryMutation();
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

  const handleCategoryEdit = (categoryId: string) => {
    setIsEditModalShown(true)
    setEditCategoryId(categoryId)
  }

  const handleCategoryDelete = async (categoryId: string) => {
    await deleteCategory(categoryId);
  }

  const handleCloseModal = () => {
    setIsEditModalShown(false)
    setIsNewModalShown(false)
    setEditCategoryId(null)
  }

  return (
    <Layout>
      <PageTitle>Categories</PageTitle>
      
      <CreateButton 
        variant="outlined" 
        onClick={() => setIsNewModalShown(true)}
      >
        🏷️ Create New Category
      </CreateButton>
      
      <StyledDialog
        open={isNewModalShown}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>
          Create New Category
          <StyledIconButton onClick={handleCloseModal}>
            <Close />
          </StyledIconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <CategoryForm onSave={handleCloseModal}/>
        </StyledDialogContent>
      </StyledDialog>

      <CategoriesList 
        items={data} 
        onEdit={handleCategoryEdit} 
        onDelete={handleCategoryDelete}
      />

      <StyledDialog
        open={isEditModalShown}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>
          Edit Category
          <StyledIconButton onClick={handleCloseModal}>
            <Close />
          </StyledIconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <CategoryForm 
            categoryId={editCategoryId ?? undefined} 
            onSave={handleCloseModal}
          />
        </StyledDialogContent>
      </StyledDialog>
    </Layout>
  )
}