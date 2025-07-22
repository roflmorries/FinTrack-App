import * as yup from 'yup';

export type CategoryFormData = yup.InferType<typeof categorySchema>;

export const categorySchema = yup.object({
  name: yup
    .string()
    .required('Category name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
    
  color: yup
    .string()
    .required('Color is required')
    .matches(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color')
});