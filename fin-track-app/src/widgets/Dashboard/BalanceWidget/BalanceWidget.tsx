import styled from 'styled-components'
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectBalance, selectFreeBalance, selectGoalsReserved } from '../../../entities/transactions/model/selectBalance'

type Props = {}

const StyledBalanceWidget = styled.div`
    width: 250px;
    height: 200px;
    background-color: #262626;
    border-radius: 17px;
    margin-left: 50px;
`

export default function BalanceWidget({}: Props) {
  const total = useAppSelector(selectBalance);
  const goals = useAppSelector(selectGoalsReserved);
  const free = useAppSelector(selectFreeBalance)
  return (
    <StyledBalanceWidget>
      <p>Balance: {total}</p>
      <p>Goals: {goals}</p>
      <p>Free: {free}</p>
    </StyledBalanceWidget>
  )
}