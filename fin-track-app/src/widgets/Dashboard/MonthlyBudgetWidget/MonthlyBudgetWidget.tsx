import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes'
import { selectMonthlyBudget } from '../../../entities/user/selectors/selectMonthlyBudget'
import MonthlyBudgetForm from '../../../features/auth/ui/MonthlyBudgetForm';

type Props = {}

export default function MonthlyBudgetWidget({}: Props) {
  const budget = useAppSelector(selectMonthlyBudget);
  return (
    <>
      <p>monthly budget: {budget}</p>
      <MonthlyBudgetForm/>
    </>
  )
}