import styled from "styled-components"
import BalanceWidget from "./BalanceWidget/BalanceWidget";
import PieChartWidget from "./PieChartWidget/PieChartWidget";
import MonthlyBudgetWidget from "./MonthlyBudgetWidget/MonthlyBudgetWidget";
import GoalsProgressWidget from "./GoalsProgressWidget/GoalsProgressWidget";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
    // <Layout>
    //   <BalanceWidget/>
    //   <PieChartWidget/>
    //   <MonthlyBudgetWidget/>
    //   <GoalsProgressWidget/>
    // </Layout>

    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid
      container
      spacing={3}
      columns={12}
      sx={{ minHeight: 'calc(100vh - 100px)' }}
      >
        <Grid size={{xs: 12, lg: 4}}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            // height: '100%',
            // overflowY: 'auto',
            pr: 1
          }}>
            <BalanceWidget/>
            <PieChartWidget/>
            <MonthlyBudgetWidget/>
            <GoalsProgressWidget/>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box title="Future Content 1" height="100%" sx={{backgroundColor: 'grey'}}/>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box title="Future Content 2" height="100%" sx={{backgroundColor: 'grey'}}/>
        </Grid>
      </Grid>
    </Box>
  )
}