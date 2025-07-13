import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Box from "@mui/material/Box";

const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35 }
};



export default function MainGrid() {
  const location = useLocation();

  return (
    // <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    //   {/* cards */}
    //   <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
    //     Overview
    //   </Typography>
    //   <Grid
    //     container
    //     spacing={2}
    //     columns={12}
    //     sx={{ mb: (theme) => theme.spacing(2) }}
    //   >
    //     {data.map((card, index) => (
    //       <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
    //         <StatCard {...card} />
    //       </Grid>
    //     ))}
    //     <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
    //       <HighlightedCard />
    //     </Grid>
    //     <Grid size={{ xs: 12, md: 6 }}>
    //       <SessionsChart />
    //     </Grid>
    //     <Grid size={{ xs: 12, md: 6 }}>
    //       <PageViewsBarChart />
    //     </Grid>
    //   </Grid>
    //   <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
    //     Details
    //   </Typography>
    //   <Grid container spacing={2} columns={12}>
    //     <Grid size={{ xs: 12, lg: 9 }}>
    //       <CustomizedDataGrid />
    //     </Grid>
    //     <Grid size={{ xs: 12, lg: 3 }}>
    //       <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
    //         {/* <CustomizedTreeView /> */}
    //         <ChartUserByCountry />
    //       </Stack>
    //     </Grid>
    //   </Grid>
    //   <Copyright sx={{ my: 4 }} />
    // </Box>
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} {...fadeTransition}>
                <Outlet/>
            </motion.div>
          </AnimatePresence>
          </Box>
  );
}
