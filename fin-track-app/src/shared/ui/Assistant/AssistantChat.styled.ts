import styled from 'styled-components';
import { TextField, IconButton } from '@mui/material';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  padding: 20px 24px;
  
  h3 {
    color: #fff;
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '🤖';
      font-size: 20px;
    }
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const MessageRow = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  background: ${props => (props.$isUser 
    ? 'linear-gradient(135deg, #007AFF, #0056CC)' 
    : 'rgba(255, 255, 255, 0.08)'
  )};
  color: #fff;
  padding: 12px 16px;
  border-radius: ${props => (props.$isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px')};
  max-width: 75%;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => (props.$isUser 
    ? 'rgba(0, 122, 255, 0.3)' 
    : 'rgba(255, 255, 255, 0.1)'
  )};
  
  white-space: pre-wrap;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  
  .MuiCircularProgress-root {
    color: #007AFF;
  }
  
  span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  }
`;

export const InputContainer = styled.div`
  padding: 20px 24px;
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

export const StyledTextField = styled(TextField)`
  flex: 1;
  
  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    color: #fff;
    min-height: 48px;
    max-height: 120px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #007AFF;
      border-width: 2px;
    }
  }
  
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .MuiInputBase-input {
    color: #fff;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      opacity: 1;
    }
  }
  
  .MuiInputBase-inputMultiline {
    padding: 12px 14px;
    line-height: 1.4;
  }
`;

export const SendButton = styled(IconButton)`
  background: linear-gradient(135deg, #007AFF, #0056CC) !important;
  color: white !important;
  width: 48px !important;
  height: 48px !important;
  border-radius: 12px !important;
  border: 1px solid rgba(0, 122, 255, 0.3) !important;
  
  &:hover {
    background: linear-gradient(135deg, #0056CC, #003D99) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3) !important;
  }
  
  &:disabled {
    background: rgba(255, 255, 255, 0.1) !important;
    color: rgba(255, 255, 255, 0.4) !important;
    transform: none !important;
    box-shadow: none !important;
  }
  
  transition: all 0.3s ease !important;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  
  .emoji {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.7;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .subtitle {
    font-size: 14px;
    opacity: 0.7;
    max-width: 300px;
  }
`;