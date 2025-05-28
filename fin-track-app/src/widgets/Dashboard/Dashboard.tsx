import styled from "styled-components"
import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"
import { selectGoalProgress } from "../../entities/fin-goals/goalProgressSelector"
import { Progress } from "antd";
import { selectAllGoals } from "../../entities/fin-goals/goalSelectors";

const Layout = styled.div`
  background-color: #141414;
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  margin: 20px;
  * {
    color: white
  }
  .progress_block {
    width: 250px;
    height: 200px;
    background-color: #262626;
    border-radius: 17px;
    margin-left: 50px;
  }
`

export default function Dashboard() {
  const goals = useAppSelector(selectAllGoals);

  return (
    <Layout>
      <p>DashboardLALALLALALA</p>
      {goals.map(goal => {
      const progress = useAppSelector(state => selectGoalProgress(state, goal.id));
      const percent = Math.min((progress / goal.amount) * 100, 100);
      return (
        <div key={goal.id} className="progress_block">
          <p>{goal.name}</p>
          <Progress percent={percent} />
          <p>{progress} / {goal.amount}</p>
        </div>
      );
    })}
      
    </Layout>
  )
}