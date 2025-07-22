import styled from 'styled-components';
import { IconButton } from '@mui/material';

export const StyledCard = styled.div<{ $color: string }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
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
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ $color }) => $color};
    border-radius: 0 4px 4px 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${({ $color }) => $color}15 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const CategoryInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ColorIndicator = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.2),
    0 2px 8px ${({ $color }) => $color}40;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const CategoryName = styled.h3<{ $color: string }>`
  color: #ffffff !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin: 0 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  background: linear-gradient(135deg, #ffffff 0%, ${({ $color }) => $color}30 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled(IconButton)<{ $variant: 'edit' | 'delete' }>`
  width: 36px !important;
  height: 36px !important;
  border-radius: 8px !important;
  padding: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  
  ${({ $variant }) => $variant === 'edit' ? `
    background: rgba(34, 197, 94, 0.15) !important;
    color: #22c55e !important;
    
    &:hover {
      background: rgba(34, 197, 94, 0.25) !important;
      border-color: #22c55e !important;
      color: #22c55e !important;
      transform: translateY(-1px);
    }
  ` : `
    background: rgba(239, 68, 68, 0.15) !important;
    color: #ef4444 !important;
    
    &:hover {
      background: rgba(239, 68, 68, 0.25) !important;
      border-color: #ef4444 !important;
      color: #ef4444 !important;
      transform: translateY(-1px);
    }
  `}
  
  transition: all 0.3s ease !important;
  
  .MuiSvgIcon-root {
    font-size: 18px !important;
  }
`;