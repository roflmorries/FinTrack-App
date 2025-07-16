import { Progress } from "antd";
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import { selectActiveGoalsWithProgress } from '../../../entities/fin-goals/goalWithProgressSelector';

type Props = {}

export default function GoalsProgressWidget({}: Props) {
  const goals = useAppSelector(selectActiveGoalsWithProgress);
  return (
      <>
      {goals.map(goal => {
      const percent = Math.min((goal.progress / goal.amount) * 100, 100);
      return (
        <div key={goal.id} className="progress_block">
          <p>{goal.name}</p>
          <Progress percent={percent} />
          <p>{goal.progress} / {goal.amount}</p>
        </div>
      );
    })}
      </>
  )
}