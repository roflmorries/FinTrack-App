import { useState } from 'react';
import { selectMonthlyBudget } from '../../../entities/user/selectors/selectMonthlyBudget';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateUser } from '../../../entities/user/model/userThunks';

type Props = {}

export default function MonthlyBudgetForm({}: Props) {
  const dispatch = useAppDispatch();
  const budget = useAppSelector(selectMonthlyBudget);
  const [value, setValue] = useState(budget?.toString() ?? "");

  const handleBudgetSave = (event: React.FormEvent) => {
    event.preventDefault();
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      dispatch(updateUser({ monthlyBudget: numValue }))
    }
  }

  return (
    <Box
    component='form'
    onSubmit={handleBudgetSave}
    >
      <TextField
      label='Monthly Budget'
      // type='number'
      value={value}
      onChange={event => setValue(event.target.value)}
      />
      <Button
      type='submit'
      >Save</Button>
    </Box>
  )
}