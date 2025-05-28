import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectBalanceHistory } from '../../../entities/transactions/model/selectBalance'
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

type Props = {}

const StyledContainer = styled.div`
    max-width: 400px;
    height: 100px;
`

export default function BalanceChartWidget({}: Props) {
  const data = useAppSelector(selectBalanceHistory)
  return (
    <StyledContainer>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line type="monotone" dataKey="balance" stroke="#a100ff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </StyledContainer>
  )
}