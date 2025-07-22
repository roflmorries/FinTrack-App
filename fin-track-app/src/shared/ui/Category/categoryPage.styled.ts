import styled from "styled-components"
import { Button, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

export const Layout = styled.div`
  /* background-color: #141414;
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  margin: 20px; */
`

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: rgba(30, 30, 30, 0.95) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 16px !important;
    color: #fff !important;
    min-width: 500px !important;
    
    @media (max-width: 768px) {
      min-width: 90% !important;
      margin: 16px !important;
    }
  }
  
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.7) !important;
    backdrop-filter: blur(4px) !important;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  padding: 20px 24px 16px 24px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 24px !important;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.7) !important;
  padding: 8px !important;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
  }
`;

export const CreateButton = styled(Button)`
  border-radius: 24px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  margin-bottom: 24px !important;
  
  &:hover {
    background: rgba(59, 130, 246, 0.25) !important;
    border-color: #3b82f6 !important;
    color: #3b82f6 !important;
    transform: translateY(-2px);
  }
  
  transition: all 0.3s ease !important;
`;

export const PageTitle = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '🏷️';
    font-size: 28px;
  }
`;