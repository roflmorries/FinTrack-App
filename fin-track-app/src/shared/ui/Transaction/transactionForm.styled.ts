import styled from 'styled-components';
import {
  Button,
  TextField,
  Box,
  Alert,
  ToggleButtonGroup,
  FormControl
} from '@mui/material';

export const AutoDetectIndicator = styled(Box)<{ $show: boolean }>`
  display: ${({ $show }) => $show ? 'flex' : 'none'};
  align-items: center;
  gap: 6px;
  color: #22c55e;
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  animation: fadeIn 0.3s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .MuiSvgIcon-root {
    font-size: 16px;
    color: #22c55e;
  }
`;

export const StyledForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;
`;

export const fieldStyles = `
  .MuiOutlinedInput-root {
  background: rgba(255, 255, 255, 0.05) !important;
    border-radius: 24px !important;
    color: #fff !important;
    height: 56px !important;
    
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
  
  .MuiSelect-select {
    color: #fff !important;
  }
  
  .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`;

export const StyledTextField = styled(TextField)`
  ${fieldStyles}
  
  &.multiline .MuiOutlinedInput-root {
    height: auto !important;
    min-height: 56px !important;
    display: flex !important;
    align-items: center !important;
    padding: 16px 14px !important;
  }
  
  &.multiline .MuiInputBase-inputMultiline {
    padding: 0 !important;
    margin: 0 !important;
    line-height: 1.4 !important;
    resize: none !important;
  }
`;

export const StyledFormControl = styled(FormControl)`
  ${fieldStyles}
`;

export const StyledDatePickerWrapper = styled(Box)`
  .MuiTextField-root {
    .MuiOutlinedInput-root {
      background: rgba(255, 255, 255, 0.05) !important;
      border-radius: 24px !important;
      color: #fff !important;
      height: 56px !important;
      
      .MuiOutlinedInput-notchedOutline {
        border-color: rgba(255, 255, 255, 0.2) !important;
        border-radius: 24px !important;
      }
      
      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: rgba(255, 255, 255, 0.3) !important;
        border-radius: 24px !important;
      }
      
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #803eff !important;
        border-width: 2px !important;
        border-radius: 24px !important;
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
  }
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  width: 100%;
  height: 56px;
  box-shadow: none !important;
  .MuiToggleButton-root {
    flex: 1;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: rgba(255, 255, 255, 0.7) !important;
    font-weight: 500 !important;
    text-transform: none !important;
    font-size: 14px !important;
    
    &:first-of-type {
      border-top-left-radius: 24px !important;
      border-bottom-left-radius: 24px !important;
    }
    
    &:last-of-type {
      border-top-right-radius: 24px !important;
      border-bottom-right-radius: 24px !important;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.08) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
    }
    
    &.Mui-selected {
      background: rgba(128, 62, 255, 0.2) !important;
      border-color: #803eff !important;
      color: #803eff !important;
      
      &:hover {
        background: rgba(128, 62, 255, 0.3) !important;
      }
    }
  }
`;

export const TypeFieldContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TypeLabel = styled.label`
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 500;
  margin-left: 14px;
`;

export const SubmitButton = styled(Button)`
  border-radius: 24px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  font-size: 16px !important;
  margin-top: 8px !important;
  height: 48px !important;
  
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

export const StyledAlert = styled(Alert)`
  background: rgba(34, 197, 94, 0.15) !important;
  border: 1px solid rgba(34, 197, 94, 0.3) !important;
  color: #22c55e !important;
  border-radius: 12px !important;
  
  .MuiAlert-icon {
    color: #22c55e !important;
  }
`;