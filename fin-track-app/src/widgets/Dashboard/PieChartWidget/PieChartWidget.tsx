import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectExpensesByCategory } from '../../../entities/categories/model/expensesByCategorySelector'
import styled from 'styled-components';

const WidgetContainer = styled.div`
    width: 400px;
    max-height: 400px;
    background-color: #262626;
    border-radius: 17px;
    margin-left: 50px;
    text-align: start;
    padding: 15px;
    margin-top: 30px;
`

export default function PieChartWidget() {
  const data = useAppSelector(selectExpensesByCategory)
  return (
    <WidgetContainer>
    <ResponsiveContainer height={300}>
      <PieChart>
        <Pie
        data={data}
        dataKey='value'
        nameKey='name'
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        // fill="#8884d8"
        paddingAngle={1}
        stroke='none'

        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color}/>
          ))}
        </Pie>
        <Tooltip/>
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
    </WidgetContainer>
  )
}