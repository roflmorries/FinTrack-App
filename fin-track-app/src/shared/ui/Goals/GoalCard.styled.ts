import styled from 'styled-components'
import { LinearProgress, IconButton } from '@mui/material'
type GoalStatus = 'active' | 'completed' | 'outdated';

export const StyledCard = styled.div<{ $status: GoalStatus }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${({ $status }) => {
    switch ($status) {
      case 'completed':
        return `
          border-color: rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.05);
          
          &::before {
            background: linear-gradient(135deg, 
              rgba(34, 197, 94, 0.1) 0%, 
              rgba(34, 197, 94, 0.02) 100%
            );
          }
        `;
      case 'outdated':
        return `
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.05);
          opacity: 0.8;
          
          &::before {
            background: linear-gradient(135deg, 
              rgba(239, 68, 68, 0.1) 0%, 
              rgba(239, 68, 68, 0.02) 100%
            );
          }
        `;
      default:
        return `
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.05);
          
          &::before {
            background: linear-gradient(135deg, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(59, 130, 246, 0.02) 100%
            );
          }
        `;
    }
  }}
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    pointer-events: none;
    z-index: 0;
  }
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const GoalInfo = styled.div`
  flex: 1;
`;

export const StatusBadge = styled.div<{ $status: GoalStatus }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ $status }) => {
    switch ($status) {
      case 'completed':
        return `
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
      case 'outdated':
        return `
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        `;
      default:
        return `
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
    }
  }}
`;

export const GoalName = styled.h3`
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  margin: 0 0 8px 0 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const GoalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  
  .MuiSvgIcon-root {
    color: rgba(255, 255, 255, 0.6);
    font-size: 18px;
  }
`;

export const ProgressSection = styled.div`
  margin-bottom: 20px;
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProgressText = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
`;

export const ProgressPercentage = styled.span<{ $status: GoalStatus }>`
  font-size: 14px;
  font-weight: 600;
  
  ${({ $status }) => {
    switch ($status) {
      case 'completed':
        return 'color: #22c55e;';
      case 'outdated':
        return 'color: #ef4444;';
      default:
        return 'color: #3b82f6;';
    }
  }}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const StyledIconButton = styled(IconButton)<{ $variant: 'edit' | 'delete' }>`
  width: 40px !important;
  height: 40px !important;
  border-radius: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  
  ${({ $variant }) => $variant === 'edit' ? `
    background: rgba(34, 197, 94, 0.15) !important;
    color: #22c55e !important;
    
    &:hover {
      background: rgba(34, 197, 94, 0.25) !important;
      border-color: #22c55e !important;
      color: #22c55e !important;
      transform: translateY(-2px);
    }
  ` : `
    background: rgba(239, 68, 68, 0.15) !important;
    color: #ef4444 !important;
    
    &:hover {
      background: rgba(239, 68, 68, 0.25) !important;
      border-color: #ef4444 !important;
      color: #ef4444 !important;
      transform: translateY(-2px);
    }
  `}
  
  transition: all 0.3s ease !important;
`;

export const PopoverContent = styled.div`
  padding: 16px;
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  min-width: 280px;
  
  .popover-text {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 12px;
    font-size: 14px;
  }
  
  .popover-buttons {
    display: flex;
    gap: 8px;
  }
`;

export const StyledLinearProgress = styled(LinearProgress)<{ $status: GoalStatus }>`
  height: 8px !important;
  border-radius: 4px !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  
  .MuiLinearProgress-bar {
    border-radius: 4px !important;
    ${({ $status }) => {
      switch ($status) {
        case 'completed':
          return 'background-color: #22c55e !important;';
        case 'outdated':
          return 'background-color: #ef4444 !important;';
        default:
          return 'background-color: #3b82f6 !important;';
      }
    }}
  }
`;