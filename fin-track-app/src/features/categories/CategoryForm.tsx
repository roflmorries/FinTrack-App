import { useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  FormLabel,
  FormHelperText
} from '@mui/material';
import { categorySchema, CategoryFormData } from './validation/categorySchema';
import { StyledForm, StyledTextField, StyledFormControl, StyledColorInput, SubmitButton } from '../../shared/ui/Category/categoryForm.styled';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../app/store/api/categoryApi';
import { useGetCategoryById } from '../../shared/lib/hooks/redux/categories/useGetCategoryById';

type CategoryFormProps = {
  onSave: () => void;
  categoryId?: string;
}


export default function CategoryForm({ onSave, categoryId }: CategoryFormProps) {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  // const currentCategory = useAppSelector(state => categoryId ? selectCategoryById(state, categoryId) : undefined);
  const currentCategory = useGetCategoryById(userId, categoryId) as { name: string; color: string } | undefined;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CategoryFormData>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#3b82f6'
    }
  });

  useEffect(() => {
    if (categoryId && currentCategory) {
      reset({
        name: currentCategory.name,
        color: currentCategory.color
      });
    } else {
      reset({
        name: '',
        color: '#3b82f6'
      });
    }
  }, [categoryId, currentCategory, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    if (!userId) return;

    const categoryData = {
      name: data.name.trim(),
      color: data.color
    };

    try {
      if (categoryId) {
        const updatedCategory = {
          id: categoryId,
          userId,
          changes: categoryData
        };
        await updateCategory(updatedCategory);
      } else {
        const newCategory = {
          userId,
          ...categoryData
        };
        await createCategory(newCategory);
      }

      onSave();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <StyledForm as="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <StyledTextField
            {...field}
            label="Category Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            variant="outlined"
            placeholder="Enter category name"
          />
        )}
      />

      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <StyledFormControl fullWidth error={!!errors.color}>
            <FormLabel component="legend">Color</FormLabel>
            <StyledColorInput
              {...field}
              format="hex"
              fallbackValue="#3b82f6"
              error={!!errors.color}
              fullWidth
            />
            {errors.color && (
              <FormHelperText>{errors.color.message}</FormHelperText>
            )}
          </StyledFormControl>
        )}
      />

      <SubmitButton
        type="submit"
        variant="outlined"
        fullWidth
        disabled={!userId || isSubmitting}
      >
        {isSubmitting 
          ? 'Saving...' 
          : categoryId 
            ? 'Update Category' 
            : 'Create Category'
        }
      </SubmitButton>
    </StyledForm>
  );
}