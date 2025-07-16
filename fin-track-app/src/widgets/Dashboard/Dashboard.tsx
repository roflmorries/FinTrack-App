import styled from "styled-components"
import BalanceWidget from "./BalanceWidget/BalanceWidget";
import PieChartWidget from "./PieChartWidget/PieChartWidget";
import MonthlyBudgetWidget from "./MonthlyBudgetWidget/MonthlyBudgetWidget";
import GoalsProgressWidget from "./GoalsProgressWidget/GoalsProgressWidget";

const Layout = styled.div`
  /* background-color: #141414; */
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  /* margin: 20px; */
  * {
    color: white
  }
  .progress_block {
    width: 250px;
    height: 200px;
    /* background-color: #262626; */
    border-radius: 17px;
    margin-left: 50px;
  }
`

export default function Dashboard() {

  return (
    <Layout>
      <BalanceWidget/>
      <PieChartWidget/>
      <MonthlyBudgetWidget/>
      <GoalsProgressWidget/>
    </Layout>
  )
}