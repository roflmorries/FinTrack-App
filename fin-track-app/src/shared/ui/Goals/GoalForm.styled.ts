import styled from 'styled-components'
import { 
  Button, 
  TextField, 
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;
`;

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.05) !important;
    border-radius: 12px !important;
    color: #fff !important;
    
    .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.2) !important;
    }
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.3) !important;
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #803eff !important;
      border-width: 2px !important;
    }
  }
  
  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7) !important;
    font-weight: 500 !important;
    
    &.Mui-focused {
      color: #803eff !important;
    }
  }
  
  .MuiInputBase-input {
    color: #fff !important;
  }
  
  .MuiFormHelperText-root {
    color: rgba(255, 255, 255, 0.6) !important;
    
    &.Mui-error {
      color: #ef4444 !important;
    }
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.05) !important;
    border-radius: 12px !important;
    color: #fff !important;
    
    .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.2) !important;
    }
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.3) !important;
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #803eff !important;
      border-width: 2px !important;
    }
  }
  
  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7) !important;
    font-weight: 500 !important;
    
    &.Mui-focused {
      color: #803eff !important;
    }
  }
  
  .MuiInputBase-input {
    color: #fff !important;
  }
  
  .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`;

export const SubmitButton = styled(Button)`
  background: rgba(128, 62, 255, 0.15) !important;
  border: 1px solid rgba(128, 62, 255, 0.3) !important;
  color: #803eff !important;
  border-radius: 12px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  font-size: 16px !important;
  margin-top: 8px !important;
  
  &:hover {
    background: rgba(128, 62, 255, 0.25) !important;
    border-color: #803eff !important;
    color: #803eff !important;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    color: rgba(255, 255, 255, 0.3) !important;
    transform: none !important;
  }
  
  transition: all 0.3s ease !important;
`;