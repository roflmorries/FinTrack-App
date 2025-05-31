import styled from "styled-components"
import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"
import { Progress } from "antd";
import BalanceWidget from "./BalanceWidget/BalanceWidget";
import { selectActiveGoalsWithProgress } from "../../entities/fin-goals/goalWithProgressSelector";
import PieChartWidget from "./PieChartWidget/PieChartWidget";

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
  const goals = useAppSelector(selectActiveGoalsWithProgress);

  return (
    <Layout>
      <p>DashboardLALALLALALA</p>
      <BalanceWidget/>
      <PieChartWidget/>
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
    </Layout>
  )
}