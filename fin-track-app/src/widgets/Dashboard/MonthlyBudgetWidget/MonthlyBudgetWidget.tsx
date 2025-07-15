import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectMonthlyBudget } from '../../../entities/user/selectors/selectMonthlyBudget'
import MonthlyBudgetForm from '../../../features/auth/ui/MonthlyBudgetForm';
import { selectMonthlyExpenses } from '../../../entities/user/selectors/selectMonthlyExpenses';
import Box from '@mui/material/Box';
import { Typography } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { addNotification } from '../../../entities/notifications/notificationThunk';
import { selectAllNotifications } from '../../../entities/notifications/notificationSelectors';
import { useBudgetNotifications } from '../../../shared/lib/hooks/useBudgetNotification';

const COLORS = ['#0088FE', '#FF8042'];

export default function MonthlyBudgetWidget() {
  const budget = useAppSelector(selectMonthlyBudget);
  const expenses = useAppSelector(selectMonthlyExpenses);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  const notifications = useAppSelector(selectAllNotifications);
  const [open, setOpen] = useState(false);

  const spent = expenses;
  const left = (budget || 0) - expenses;

  useBudgetNotifications(userId, budget, spent);

  const data = [
    { name: 'Потрачено', value: Math.max(spent, 0) },
    { name: 'Осталось', value: Math.max(left, 0) },
  ];
  return (
    <Box sx={{ p: 2, borderRadius: 2, background: '#222', color: '#fff', width: 350 }}>
      <Typography >Monthly Budget</Typography>

      <Button onClick={() => setOpen(true)}>Add monthly budget</Button>
      <Dialog open={open} >
        <DialogTitle>Add your monthly budget</DialogTitle>
        <DialogContent>
          <MonthlyBudgetForm onSuccess={() => setOpen(false)}/>
        </DialogContent>
      </Dialog>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
          ))}
        </Pie>
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={18}
            fontWeight={500}
          >
            Monthly budget
        </text>
      </PieChart>
      {/* ✅ ИСПРАВЛЕНО: показываем реальные цифры */}
      <Typography>Потрачено: {spent} / {budget || 0}</Typography>
      <Typography style={{ color: left < 0 ? '#ff4444' : '#fff' }}>
        {left >= 0 ? `Осталось: ${left}` : `Превышено на: ${Math.abs(left)}`}
      </Typography>
    </Box>
  )
}