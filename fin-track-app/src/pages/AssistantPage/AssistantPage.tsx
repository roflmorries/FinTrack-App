import Box from "@mui/material/Box";
import { lazy, Suspense } from "react";
const AiAssistantChat = lazy(() => import ("../../features/ai-assistant/AiAssistantChat"))


// const Layout = styled.div`
//   background-color: #141414;
//   height: 96%;
//   border-radius: 24px;
//   padding: 1px;
//   margin: 20px;
//   p {
//     color: white
//   }
// `;

export default function AssistantPage() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <p>AI</p>
      <Suspense fallback={<div>Loading...</div>}>
        <AiAssistantChat/>
      </Suspense>
    </Box>
  )
}