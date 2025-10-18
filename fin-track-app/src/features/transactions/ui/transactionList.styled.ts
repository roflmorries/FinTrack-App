import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TransactionsContainer = styled(Box)`

`;

export const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
});

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  paddingBottom: '16px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

export const Title = styled(Typography)(({ theme }) => ({
  color: '#ffffff !important',
  fontSize: '20px !important',
  fontWeight: 600,
  margin: '0 !important',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  '&::before': {
    content: '"💳"',
    fontSize: '24px',
  },
}));

export const FilterContainer = styled(Box)({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '24px',
  
  '& .MuiFormControl-root': {
    width: '220px',
    
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7) !important',
      
      '&.Mui-focused': {
        color: 'rgba(255, 255, 255, 0.9) !important',
      },
    },
    
    '& .MuiOutlinedInput-root': {
      color: '#fff !important',
      
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.2) !important',
      },
      
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.3) !important',
      },
      
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.5) !important',
      },
      
      '& .MuiSelect-icon': {
        color: 'rgba(255, 255, 255, 0.7) !important',
      },
    },
  },
});

export const TransactionsGrid = styled(Box)({
  display: 'flex',
  gap: '24px',
  
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '16px',
  },
});

export const TransactionSection = styled(Box)({
  flex: 1,
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '16px',
  padding: '20px',
  transition: 'all 0.3s ease',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
});

export const SectionTitle = styled(Typography)({
  color: '#ffffff !important',
  fontSize: '18px !important',
  fontWeight: '600 !important',
  margin: '0 0 16px 0 !important',
  paddingBottom: '12px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  
  '&.income': {
    color: '#4ade80 !important',
    
    '&::before': {
      content: '"📈"',
      fontSize: '20px',
    },
  },
  
  '&.expense': {
    color: '#f87171 !important',
    
    '&::before': {
      content: '"📉"',
      fontSize: '20px',
    },
  },
});

export const TransactionList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const SingleList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const EmptyState = styled(Box)({
  textAlign: 'center',
  padding: '40px 20px',
  color: 'rgba(255, 255, 255, 0.6)',
  
  '& .empty-icon': {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5,
  },
  
  '& .empty-text': {
    fontSize: '16px',
    marginBottom: '8px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  '& .empty-subtext': {
    fontSize: '14px',
    opacity: 0.7,
  },
});