import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = styled(ToastContainer)`
  /* Стили для контейнера toast */
  .Toastify__toast {
    background: rgba(30, 30, 30, 0.95) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 16px !important;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 4px 16px rgba(0, 0, 0, 0.15) !important;
    
    color: #ffffff !important;
    font-weight: 500 !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    overflow: hidden !important;
    position: relative !important;
    
    &:hover {
      transform: translateY(-2px) !important;
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.4),
        0 8px 20px rgba(0, 0, 0, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.25) !important;
    }
  }

  .Toastify__toast--error {
    background: rgba(20, 20, 20, 0.95) !important;
    border-color: rgba(239, 68, 68, 0.4) !important;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.05));
      border-radius: 16px;
      pointer-events: none;
    }
  }

  .Toastify__toast--warning {
    background: rgba(20, 20, 20, 0.95) !important;
    border-color: rgba(245, 158, 11, 0.4) !important;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05));
      border-radius: 16px;
      pointer-events: none;
    }
  }

  .Toastify__toast--success {
    background: rgba(20, 20, 20, 0.95) !important;
    border-color: rgba(34, 197, 94, 0.4) !important;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(21, 128, 61, 0.05));
      border-radius: 16px;
      pointer-events: none;
    }
  }

  .Toastify__toast--info {
    background: rgba(20, 20, 20, 0.95) !important;
    border-color: rgba(59, 130, 246, 0.4) !important;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.05));
      border-radius: 16px;
      pointer-events: none;
    }
  }

  .Toastify__progress-bar {
    height: 3px !important;
    border-radius: 0 0 16px 16px !important;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.7)) !important;
    overflow: hidden !important;
    margin: 0 !important;
  }

  .Toastify__close-button {
    color: rgba(255, 255, 255, 0.9) !important;
    opacity: 0.9 !important;
    
    &:hover {
      opacity: 1 !important;
      color: #fff !important;
    }
  }
`;