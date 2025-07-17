import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes'
import { FormControl, InputAdornment } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { selectGoalById } from '../../entities/fin-goals/goalSelectors';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { createGoal, updateGoal } from '../../entities/fin-goals/goalThunk';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { goalSchema } from './validation/goalSchema';
import { StyledForm, StyledTextField, StyledDatePicker, SubmitButton } from '../../shared/ui/Goals/GoalForm.styled';

type GoalFormProps = {
  onSave: () => void,
  goalId?: string,
}

type GoalFormData = yup.InferType<typeof goalSchema>;


export default function GoalForm({onSave, goalId}: GoalFormProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  const currentGoal = useAppSelector(state => goalId ? selectGoalById(state, goalId) : undefined);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<GoalFormData>({
    resolver: yupResolver(goalSchema),
    defaultValues: {
      name: '',
      amount: 1,
      deadline: dayjs().add(1, 'month').toDate()
    }
  });

  useEffect(() => {
    if (goalId && currentGoal) {
      reset({
        name: currentGoal.name,
        amount: currentGoal.amount,
        deadline: dayjs(currentGoal.deadline).toDate()
      });
    } else {
      reset({
        name: '',
        amount: 1,
        deadline: dayjs().add(1, 'month').toDate()
      });
    }
  }, [goalId, currentGoal, reset]);

  const onSubmit = (data: GoalFormData) => {
    if (!userId) return;

    const goalData = {
      name: data.name.trim(),
      amount: data.amount,
      deadline: dayjs(data.deadline).format("YYYY-MM-DD")
    };

    if (goalId) {
      const updatedGoal = {
        id: goalId,
        userId,
        changes: goalData
      };
      dispatch(updateGoal(updatedGoal));
    } else {
      const newGoal = {
        userId,
        ...goalData
      };
      dispatch(createGoal(newGoal));
    }

    onSave();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledForm as="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="Goal Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              variant="outlined"
              placeholder="Enter your financial goal"
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <StyledTextField
              {...field}
              label="Target Amount"
              type="number"
              value={value || ''}
              onChange={(e) => {
                const numValue = e.target.value === '' ? 0 : Number(e.target.value);
                onChange(numValue);
              }}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              fullWidth
              variant="outlined"
              placeholder="0"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>$</span>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: 1,
                step: 1
              }}
            />
          )}
        />

        <FormControl fullWidth error={!!errors.deadline}>
          <Controller
            name="deadline"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <StyledDatePicker
                {...field}
                label="Deadline"
                value={value ? dayjs(value) : null}
                onChange={(newValue) => {
                  onChange(newValue ? newValue.toDate() : null);
                }}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    error: !!errors.deadline,
                    helperText: errors.deadline?.message,
                    fullWidth: true
                  }
                }}
              />
            )}
          />
        </FormControl>

        <SubmitButton
          type="submit"
          variant="outlined"
          fullWidth
          disabled={!userId || isSubmitting}
        >
          {isSubmitting 
            ? 'Saving...' 
            : goalId 
              ? 'Update Goal' 
              : 'Create Goal'
          }
        </SubmitButton>
      </StyledForm>
    </LocalizationProvider>
  );
}