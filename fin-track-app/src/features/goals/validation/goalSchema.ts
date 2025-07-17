import * as yup from 'yup';

export const goalSchema = yup.object({
  name: yup
    .string()
    .required('Goal name is required')
    .min(2, 'Name must be at least 2 characters'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .integer('Amount must be a whole number'),
  deadline: yup
    .date()
    .required('Deadline is required')
    .min(new Date(), 'Deadline must be in the future')
});