import { useState } from 'react';
import { selectMonthlyBudget } from '../../../entities/user/selectors/selectMonthlyBudget';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateUser } from '../../../entities/user/model/userThunks';

type MonthlyBudgetFormProps = {
  onSuccess?: () => void;
}

export default function MonthlyBudgetForm({ onSuccess }: MonthlyBudgetFormProps) {
  const dispatch = useAppDispatch();
  const budget = useAppSelector(selectMonthlyBudget);
  const [value, setValue] = useState(budget?.toString() ?? "");

  const handleBudgetSave = (event: React.FormEvent) => {
    event.preventDefault();
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      dispatch(updateUser({ monthlyBudget: numValue }));
      if (onSuccess) onSuccess();
    }
  }

  return (
    <Box
    component='form'
    onSubmit={handleBudgetSave}
    >
      <TextField
      label='Monthly Budget'
      value={value}
      onChange={event => setValue(event.target.value)}
      />
      <Button
      type='submit'
      >Save</Button>
    </Box>
  )
}