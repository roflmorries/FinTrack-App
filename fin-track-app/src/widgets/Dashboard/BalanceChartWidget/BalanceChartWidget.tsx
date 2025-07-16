import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectBalanceHistory, selectBalance } from '../../../entities/transactions/model/selectBalance'
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
  const data = useAppSelector(selectBalanceHistory);
  const balance = useAppSelector(selectBalance);
  
  const chartData = useMemo(() => {
    if (data.length === 0) return [];
    
    if (data.length === 1) {
      return [
        { ...data[0], date: 'Previous' },
        { ...data[0] }
      ];
    }
    
    return data;
  }, [data]);

  const isEmpty = useMemo(() => 
    data.length === 0 || balance === 0, 
    [data.length, balance]
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