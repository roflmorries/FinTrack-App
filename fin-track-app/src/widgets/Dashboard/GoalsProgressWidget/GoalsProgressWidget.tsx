import { Progress } from "antd";
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import { selectActiveGoalsWithProgress } from '../../../entities/fin-goals/goalWithProgressSelector';
import styled from 'styled-components';
import { memo, useMemo } from 'react';

type Props = {}

const StyledGoalsWidget = styled.div`
  width: 100%;
  min-height: 200px;

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
  }
  
  .goals-title {
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin-bottom: 16px !important;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .goal-item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateX(4px);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .goal-name {
    color: #ffffff !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .goal-progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    
    .progress-text {
      color: rgba(255, 255, 255, 0.8) !important;
      font-size: 14px;
      font-weight: 500;
    }
    
    .progress-percentage {
      color: #4ade80 !important;
      font-weight: 600;
    }
  }
  
  .ant-progress {
    .ant-progress-bg {
      background: linear-gradient(90deg, #4ade80, #22c55e) !important;
    }
    
    .ant-progress-inner {
      background: rgba(255, 255, 255, 0.1) !important;
      border-radius: 8px !important;
    }
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
    }
    
    .empty-subtext {
      font-size: 14px;
      opacity: 0.7;
    }
  }
`;

const GoalItem = memo(({ goal }: { goal: any }) => {
  const percent = useMemo(
    () => Math.min((goal.progress / goal.amount) * 100, 100),
    [goal.progress, goal.amount]
  );

  return (
    <div className="goal-item">
      <div className="goal-name">
        <span>💰</span>
        {goal.name}
      </div>
      
      <div className="goal-progress-info">
        <span className="progress-text">
          {goal.progress.toLocaleString()} / {goal.amount.toLocaleString()} ₽
        </span>
        <span className="progress-percentage">
          {Math.round(percent)}%
        </span>
      </div>
      
      <Progress 
        percent={percent} 
        showInfo={false}
        strokeColor={{
          '0%': '#4ade80',
          '100%': '#22c55e',
        }}
        trailColor="rgba(255, 255, 255, 0.1)"
        strokeWidth={8}
      />
    </div>
  );
});

GoalItem.displayName = 'GoalItem';

const GoalsProgressWidget = memo(({}: Props) => {
  const goals = useAppSelector(selectActiveGoalsWithProgress);
  
  const hasGoals = useMemo(() => goals.length > 0, [goals.length]);
  
  return (
    <StyledGoalsWidget>
      <div className="widget-content">
        <h3 className="goals-title">🎯 Active Goals</h3>
        
        {hasGoals ? (
          goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <div className="empty-text">No active goals</div>
            <div className="empty-subtext">Create your first financial goal to track progress</div>
          </div>
        )}
      </div>
    </StyledGoalsWidget>
  );
});

GoalsProgressWidget.displayName = 'GoalsProgressWidget';

export default GoalsProgressWidget;