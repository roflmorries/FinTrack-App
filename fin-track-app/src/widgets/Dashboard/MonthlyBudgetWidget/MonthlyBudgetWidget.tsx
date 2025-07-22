import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectMonthlyBudget } from '../../../entities/user/selectors/selectMonthlyBudget'
import MonthlyBudgetForm from '../../../features/auth/ui/MonthlyBudgetForm';
import { selectMonthlyExpenses } from '../../../entities/user/selectors/selectMonthlyExpenses';
import { Typography } from 'antd';
import { PieChart, Pie, Cell } from 'recharts';
import { memo, useMemo, useCallback, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useBudgetNotifications } from '../../../shared/lib/hooks/useBudgetNotification';
import styled from 'styled-components';

const COLORS = ['#007AFF', '#FF3B30'];

const StyledBudgetWidget = styled.div`
  width: 100%;
  height: 400px;

  will-change: transform;
  contain: layout style paint;
  
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.15);
  
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.25);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      rgba(255, 255, 255, 0.02) 50%, 
      rgba(255, 255, 255, 0.01) 100%
    );
    border-radius: 24px;
    pointer-events: none;
  }
  
  .widget-content {
    position: relative;
    z-index: 1;
    height: 100%;
  }
  
  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .budget-title {
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin: 0 !important;
  }
  

  .add-budget-btn {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: #fff !important;
    border-radius: 12px !important;
    margin: 8px 0 !important;
    transition: all 0.3s ease !important;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
    }
  }
  
  .budget-info {
    color: #ffffff !important;
    font-size: 14px !important;
    margin: 4px 0 !important;
    opacity: 0.9;
    
  }
  
  .budget-warning {
    font-weight: 500 !important;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: rgba(255, 255, 255, 0.6);
    
    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }
    
    .empty-text {
      font-size: 16px;
      margin-bottom: 8px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .empty-subtext {
      font-size: 14px;
      opacity: 0.7;
      margin-bottom: 20px;
    }
  }
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: rgba(30, 30, 30, 0.95) !important;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px !important;
    color: #fff;
  }
  
  .MuiDialogTitle-root {
    color: #fff !important;
  }
`;

const MemoizedBudgetChart = memo(({ data }: { data: any[] }) => (
  <PieChart width={300} height={250}>
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={80}
      outerRadius={110}
      fill="#8884d8"
      stroke='none'
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
      fontSize={16}
      fontWeight={500}
    >
      Budget
    </text>
  </PieChart>
));

const MonthlyBudgetWidget = memo(() => {
  const budget = useAppSelector(selectMonthlyBudget);
  const expenses = useAppSelector(selectMonthlyExpenses);
  const userId = useAppSelector(state => state.user.currentUser?.uid);
  const [open, setOpen] = useState(false);

  const { spent, left, data, hasBudget } = useMemo(() => {
    const spent = expenses;
    const left = (budget || 0) - expenses;
    const data = [
      { name: 'Потрачено', value: Math.max(spent, 0) },
      { name: 'Осталось', value: Math.max(left, 0) },
    ];
    const hasBudget = budget && budget > 0;
    
    return { spent, left, data, hasBudget };
  }, [budget, expenses]);

  const handleOpenDialog = useCallback(() => setOpen(true), []);
  const handleCloseDialog = useCallback(() => setOpen(false), []);

  useBudgetNotifications(userId, budget, spent);

  return (
    <StyledBudgetWidget>
      <div className="widget-content">
        <div className="widget-header">
          <Typography className="budget-title">💰 Monthly Budget</Typography>
          {hasBudget && (
            <Button 
              className="edit-budget-btn"
              variant='text'
              onClick={handleOpenDialog}
            >
              Edit
            </Button>
          )}
        </div>

        {!hasBudget ? (
          <div className="empty-state">
            <div className="empty-icon">💸</div>
            <div className="empty-text">No budget set</div>
            <div className="empty-subtext">Set your monthly budget to track spending</div>
            <Button 
              className="add-budget-btn"
              onClick={handleOpenDialog}
            >
              Set Monthly Budget
            </Button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <MemoizedBudgetChart data={data}/>
            </div>
            
            <Typography className="budget-info">
              Потрачено: {spent} / {budget}
            </Typography>
            <Typography 
              className="budget-info budget-warning"
              style={{ color: left < 0 ? '#ff4444' : '#fff' }}
            >
              {left >= 0 ? `Осталось: ${left}` : `Превышено на: ${Math.abs(left)}`}
            </Typography>
          </>
        )}
        
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>
            {hasBudget ? 'Edit your monthly budget' : 'Add your monthly budget'}
          </DialogTitle>
          <DialogContent>
            <MonthlyBudgetForm onSuccess={handleCloseDialog}/>
          </DialogContent>
        </Dialog>
      </div>
    </StyledBudgetWidget>
  );
});

MonthlyBudgetWidget.displayName = 'MonthlyBudgetWidget';

export default MonthlyBudgetWidget;