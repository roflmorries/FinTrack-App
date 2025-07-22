import * as yup from 'yup';


export const transactionSchema = yup.object({
  type: yup
    .string()
    .oneOf(['income', 'expense'], 'Type must be income or expense')
    .required('Transaction type is required'),
    
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .min(0.01, 'Amount must be at least 0.01'),
    
  category: yup
    .string()
    .required('Category is required'),
    
  date: yup
    .date()
    .required('Date is required'),
    
  comment: yup
    .string()
    .max(500, 'Comment must be less than 500 characters')
    .default(''),

  goalId: yup
    .string()
    .required('Goal ID is required')
    .default('')
    .when('category', {
      is: 'Goals',
      then: (schema) => schema.required('Goal is required when category is Goals'),
      otherwise: (schema) => schema.notRequired()
    })
});