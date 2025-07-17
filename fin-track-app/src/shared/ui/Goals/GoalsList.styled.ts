import styled from 'styled-components';

export const GoalsContainer = styled.div`
  /* background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px; */
  
  /* box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.15);
  
  padding: 24px;
  position: relative;
  overflow: hidden;
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      rgba(255, 255, 255, 0.02) 50%, 
      rgba(255, 255, 255, 0.01) 100%
    );
    border-radius: 24px;
    pointer-events: none;
    z-index: 0;
  } */
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.h2`
  color: #ffffff !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '🎯';
    font-size: 24px;
  }
`;

export const CountBadge = styled.span`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

export const GoalsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
  
  .empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.5;
  }
  
  .empty-text {
    font-size: 18px;
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .empty-subtext {
    font-size: 14px;
    opacity: 0.7;
  }
`;