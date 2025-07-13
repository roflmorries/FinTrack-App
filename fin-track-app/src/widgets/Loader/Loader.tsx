import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

export default function Loader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: 'black'}}>
      <CircularProgress sx={{ color: '#803eff'}}/>
    </Box>
  )
}