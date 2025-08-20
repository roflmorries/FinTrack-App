import styled from 'styled-components'
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectBalance, selectFreeBalance, selectGoalsReserved } from '../../../entities/transactions/model/selectBalance'
import BalanceChartWidget from '../BalanceChartWidget/BalanceChartWidget'
import { memo, useMemo } from 'react';

type Props = {}

const StyledBalanceWidget = styled.div`
  width: 100%;
  height: 200px;

  will-change: transform;
  contain: layout style paint;
  
  /* background: rgba(30, 30, 30, 0.95); */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.15);
  
  text-align: start;
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
  
  .info__container {
    max-height: 40%;
    line-height: 12px;
    position: relative;
    z-index: 1;
    
    p {
      color: #ffffff;
      font-weight: 500;
      font-size: 14px;
      margin: 8px 0;
      opacity: 0.9;
      
      &:first-child {
        font-size: 16px;
        font-weight: 600;
        opacity: 1;
      }
    }
  }
`;

const BalanceInfo = memo(({ total, goals, free }: { total: number, goals: number, free: number }) => (
  <div className='info__container'>
    <p>Balance: {total.toLocaleString()}</p>
    <p>Goals: {goals.toLocaleString()}</p>
    <p>Free: {free.toLocaleString()}</p>
  </div>
));

BalanceInfo.displayName = 'BalanceInfo';

const BalanceWidget = memo(({}: Props) => {
  const total = useAppSelector(selectBalance);
  const goals = useAppSelector(selectGoalsReserved);
  const free = useAppSelector(selectFreeBalance);
  
  const balanceData = useMemo(() => ({ total, goals, free }), [total, goals, free]);
  
  return (
    <StyledBalanceWidget>
      <BalanceInfo {...balanceData} />
      <BalanceChartWidget/>
    </StyledBalanceWidget>
  );
});

BalanceWidget.displayName = 'BalanceWidget';

export default BalanceWidget;