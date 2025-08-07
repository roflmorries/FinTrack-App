import Box from "@mui/material/Box";
import { lazy, Suspense } from "react";
const AiAssistantChat = lazy(() => import ("../../features/ai-assistant/AiAssistantChat"))


export default function AssistantPage() {
  return (
    <Box sx={{ width: '100%', height: '91vh' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <AiAssistantChat/>
      </Suspense>
    </Box>
  )
}