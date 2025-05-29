import styled from 'styled-components'
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectBalance, selectFreeBalance, selectGoalsReserved } from '../../../entities/transactions/model/selectBalance'
import BalanceChartWidget from '../BalanceChartWidget/BalanceChartWidget'

type Props = {}

const StyledBalanceWidget = styled.div`
    width: 400px;
    height: 200px;
    background-color: #262626;
    border-radius: 17px;
    margin-left: 50px;
    text-align: start;
    padding: 15px;
    .info__container {
      max-height: 40%;
      line-height: 8px;
    }
`

export default function BalanceWidget({}: Props) {
  const total = useAppSelector(selectBalance);
  const goals = useAppSelector(selectGoalsReserved);
  const free = useAppSelector(selectFreeBalance)
  return (
    <StyledBalanceWidget>
      <div className='info__container'>
        <p>Balance: {total}</p>
        <p>Goals: {goals}</p>
        <p>Free: {free}</p>
      </div>
      <BalanceChartWidget/>
    </StyledBalanceWidget>
  )
}