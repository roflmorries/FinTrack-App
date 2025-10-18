import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { useBalanceCalculations } from '../../../shared/lib/hooks/redux/useBalanceCalculations';
import { useBalanceHistory } from '../../../shared/lib/hooks/redux/useBalanceHistory';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { useMemo, memo } from 'react';

type Props = {}

const StyledContainer = styled.div`
  max-width: 400px;
  height: 100px;

  will-change: transform;
  contain: layout style paint;
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: rgba(255, 255, 255, 0.6);
    
    .empty-icon {
      font-size: 24px;
      margin-bottom: 8px;
      opacity: 0.5;
    }
    
    .empty-text {
      font-size: 14px;
      margin-bottom: 4px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .empty-subtext {
      font-size: 12px;
      opacity: 0.7;
    }
  }
`

const MemoizedLineChart = memo(({ data }: { data: any[] }) => (
  <ResponsiveContainer>
    <LineChart data={data}>
      <Line 
        type="monotone" 
        dataKey="balance" 
        stroke="#a100ff" 
        strokeWidth={2} 
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
));

const EmptyState = memo(() => (
  <div className="empty-state">
    <div className="empty-text">No balance data</div>
    <div className="empty-subtext">Add transactions to see chart</div>
  </div>
));

const BalanceChartWidget = memo(({}: Props) => {
  const userId = useAppSelector(state => state.user.currentUser?.uid)
  const { balance, goalsReserved, freeBalance } = useBalanceCalculations(userId);
  const { history } = useBalanceHistory(userId);


  // const data = useAppSelector(selectBalanceHistory);
  // const balance = useAppSelector(selectBalance);
  
  const chartData = useMemo(() => {
    if (history.length === 0) return [];
    
    if (history.length === 1) {
      return [
        { ...history[0], date: 'Previous' },
        { ...history[0] }
      ];
    }
    
    return history;
  }, [history]);

  const isEmpty = useMemo(() => 
    history.length === 0 || balance === 0, 
    [history.length, balance]
  );
  
  return (
    <StyledContainer>
      {isEmpty ? (
        <EmptyState />
      ) : (
        <MemoizedLineChart data={chartData} />
      )}
    </StyledContainer>
  );
});

BalanceChartWidget.displayName = 'BalanceChartWidget';

export default BalanceChartWidget;