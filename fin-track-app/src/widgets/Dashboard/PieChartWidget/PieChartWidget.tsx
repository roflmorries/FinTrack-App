import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectExpensesByCategory } from '../../../entities/categories/model/expensesByCategorySelector'
import styled from 'styled-components';
import { memo, useMemo } from 'react';

const WidgetContainer = styled.div`
  width: 100%;
  height: 400px;

  will-change: transform;
  contain: layout style paint;

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

  .widget-content {
    position: relative;
    z-index: 1;
  }

  .chart-title {
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin-bottom: 16px !important;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    }
  }
`;

// const MemoizedPie = memo(({ data }: { data: any[] }) => (
//   <Pie
//     data={data}
//     dataKey='value'
//     nameKey='name'
//     cx="50%"
//     cy="50%"
//     innerRadius={70}
//     outerRadius={90}
//     stroke='none'
//   >
//     {data.map((entry, index) => (
//       <Cell key={`cell-${index}`} fill={entry.color}/>
//     ))}
//   </Pie>
// ));

const MemoizedTooltip = memo(() => (
  <Tooltip
    formatter={(value) => [`${value}`, 'Сумма']}
    contentStyle={{ 
      background: "rgba(20, 20, 20, 0.95)", 
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "12px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
    }}
  />
));

const PieChartWidget = memo(() => {
  const data = useAppSelector(selectExpensesByCategory);
  
  const hasData = useMemo(() => {
    const result = data && Array.isArray(data) && data.length > 0;
    return result;
  }, [data]);

  return (
    <WidgetContainer>
      <div className="widget-content">
        <h3 className="chart-title">Categories</h3>
        
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                stroke='none'
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color}/>
                ))}
              </Pie>
              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize={16}
                fontWeight={500}
              >
                Expenses
              </text>
              <MemoizedTooltip />
              <Legend/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <div className="empty-text">No categories data</div>
            <div className="empty-subtext">Add some expenses to see category breakdown</div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
});



PieChartWidget.displayName = 'PieChartWidget';

export default PieChartWidget;