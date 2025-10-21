import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { useEffect, useMemo, useCallback, useState } from "react";
import { debounce } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from "dayjs";
import {
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  ToggleButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AutoAwesome } from '@mui/icons-material';
import { transactionSchema } from './validation/transactionSchema';
import { StyledForm, TypeFieldContainer, TypeLabel, StyledToggleButtonGroup, StyledTextField, StyledFormControl, AutoDetectIndicator, SubmitButton } from '../../shared/ui/Transaction/transactionForm.styled';
import { useCreateTransactionMutation, useDetectCategoryByDescriptionMutation, useUpdateTransactionMutation } from "../../app/store/api/transactionApi";
import { useGetTransactionById } from "../../shared/lib/hooks/redux/useGetTransactionById";
import { useGetCategoriesQuery } from "../../app/store/api/categoryApi";
import { useGetGoalsQuery } from "../../app/store/api/goalsApi";

interface TransactionFormProps {
  onSave: () => void;
  transactionId?: string;
}

type TransactionFormData = yup.InferType<typeof transactionSchema>;


export default function TransactionForm({ onSave, transactionId }: TransactionFormProps) {
  // const categories = useAppSelector(selectAllCategories);
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  const currentTransaction = useGetTransactionById(userId, transactionId);
  const { data: goals = [] } = useGetGoalsQuery(userId || '', { skip: !userId });
  const [showAutoDetect, setShowAutoDetect] = useState(false);
  const [detectedCategory, setDetectedCategory] = useState('');

  const [createTransaction, { isLoading: isCreating }] = useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating }] = useUpdateTransactionMutation();
  const [detectCategoryByDescription, { isLoading: isDetecting, error }] = useDetectCategoryByDescriptionMutation();
  const { data: categories = [] } = useGetCategoriesQuery(userId || '', { skip: !userId });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      amount: 0,
      category: '',
      date: dayjs().toDate(),
      comment: '',
      goalId: ''
    }
  });

  const watchedCategory = watch('category');

  useEffect(() => {
    if (transactionId && currentTransaction) {
      reset({
        type: currentTransaction.type as 'income' | 'expense',
        amount: currentTransaction.amount,
        category: currentTransaction.category,
        date: dayjs(currentTransaction.date).toDate(),
        comment: currentTransaction.comment || '',
        goalId: currentTransaction.goalId || ''
      });
    } else {
      reset({
        type: 'expense',
        amount: 0,
        category: '',
        date: dayjs().toDate(),
        comment: '',
        goalId: ''
      });
    }
  }, [transactionId, currentTransaction, reset]);

  const detectCategory = useCallback(
    debounce(async (comment: string) => {
      if (!comment || !userId) return;

      try {
        // const { data } = await axios.post<{ category: string }>(
        //   `${API_URL}/detect-category`,
        //   { description: comment, userId }
        // );

        const category = await detectCategoryByDescription({ description: comment, userId }).unwrap();

        if (category) {
          setValue('category', category);
          setDetectedCategory(category);
          setShowAutoDetect(true);

          setTimeout(() => {
            setShowAutoDetect(false);
          }, 3000);

          // dispatch(fetchCategories(userId));
        }
      } catch (error) {
        console.error('Error detecting category:', error);
      }
    }, 400),
    [userId, setValue, detectCategoryByDescription]
  );

  const categoryOptions = useMemo(() =>
    categories.map(category => ({
      value: category.name,
      label: category.name
    })),
    [categories]
  );

  const goalOptions = useMemo(() =>
    goals.map(goal => ({
      value: goal.id,
      label: goal.name
    })),
    [goals]
  );

  const onSubmit = async (data: TransactionFormData) => {
    if (!userId) return;

    const transactionData = {
      userId,
      type: data.type,
      amount: data.amount,
      category: data.category,
      date: dayjs(data.date).format("YYYY-MM-DD"),
      ...(data.comment && data.comment.trim() && { comment: data.comment.trim() }),
      ...(data.goalId && { goalId: data.goalId })
    };

    try {
      if (transactionId) {
        const updatedTransaction = {
          id: transactionId,
          changes: transactionData
        };
        await updateTransaction(updatedTransaction);
      } else {
        await createTransaction(transactionData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledForm as="form" onSubmit={handleSubmit(onSubmit)}>
        <TypeFieldContainer>
          <TypeLabel>Transaction Type</TypeLabel>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <StyledToggleButtonGroup
                value={value}
                exclusive
                onChange={(_, newValue) => {
                  if (newValue !== null) {
                    onChange(newValue);
                  }
                }}
              >
                <ToggleButton value="income">
                  💰 Income
                </ToggleButton>
                <ToggleButton value="expense">
                  💸 Expense
                </ToggleButton>
              </StyledToggleButtonGroup>
            )}
          />
          {errors.type && (
            <FormHelperText error>{errors.type.message}</FormHelperText>
          )}
        </TypeFieldContainer>

        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <StyledTextField
              {...field}
              // label="Amount"
              type="number"
              value={value || ''}
              onChange={(e) => onChange(Number(e.target.value))}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              fullWidth
              variant="outlined"
              placeholder="Amount"
              inputProps={{
                min: 0.01,
                step: 0.01
              }}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <StyledFormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select {...field} label="Category">
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <FormHelperText error>{errors.category.message}</FormHelperText>
              )}
            </StyledFormControl>
          )}
        />

        <AutoDetectIndicator $show={showAutoDetect}>
          <AutoAwesome />
          <span>Auto-Detected Category</span>
        </AutoDetectIndicator>

        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <StyledTextField
              {...field}
              label="Date"
              type="date"
              value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
              onChange={(e) => onChange(new Date(e.target.value))}
              error={!!errors.date}
              helperText={errors.date?.message}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: dayjs().format('YYYY-MM-DD')
              }}
            />
          )}
        />

        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="Comment"
              error={!!errors.comment}
              helperText={errors.comment?.message || "💡 Describe your transaction for AI category detection"}
              fullWidth
              variant="outlined"
              placeholder="Coffee at Starbucks, Car Payments etc "
              multiline
              rows={2}
              className="multiline"
              onChange={(e) => {
                field.onChange(e);
                detectCategory(e.target.value);
              }}
            />
          )}
        />

        {watchedCategory === 'Goals' && (
          <>
            <Controller
              name="goalId"
              control={control}
              render={({ field }) => (
                <StyledFormControl fullWidth error={!!errors.goalId}>
                  <InputLabel>Goal</InputLabel>
                  <Select {...field} label="Goal">
                    {goalOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.goalId && (
                    <FormHelperText error>{errors.goalId.message}</FormHelperText>
                  )}
                </StyledFormControl>
              )}
            />
          </>
        )}

        <SubmitButton
          type="submit"
          variant="outlined"
          fullWidth
          disabled={!userId || isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : transactionId
              ? 'Update Transaction'
              : 'Create Transaction'
          }
        </SubmitButton>
      </StyledForm>
    </LocalizationProvider>
  );
}