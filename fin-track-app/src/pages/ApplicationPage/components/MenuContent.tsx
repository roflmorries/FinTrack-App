import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import Button from '@mui/material/Button';
import { exportTransactionsToCSV, exportTransactionsToPDF } from '../../../shared/lib/export/exportTransactions';
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import { SelectAllTransactions } from '../../../entities/transactions/model/transactionsSelectors';
import styled from 'styled-components';


const StyledNavLink = styled(NavLink)(({ theme }) => ({
  alignItems: "center",
  textDecoration: "none",
  gap: "3%",
  fontWeight: 400,
  
  width: "100%",

  willChange: "transform",
  contain: "layout style paint",

  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: 24,

  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.15)
  `,

  padding: 20,
  position: "relative",
  overflow: "hidden",

  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    boxShadow: `
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.2);
    `,
    borderColor: "rgba(255, 255, 255, 0.25)"
  },

  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    pointerEvents: "none",
  },

  "&.active": {
    color: "#803eff",
    fontWeight: 600,
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01) 100%)",
  }
}));

const mainListItems = [
  { text: 'Dashboard', icon: <DashboardCustomizeRoundedIcon />, to: '/dashboard' },
  { text: 'Transactions', icon: <AccountBalanceRoundedIcon />, to: '/dashboard/transactions' },
  { text: 'Categories', icon: <CategoryRoundedIcon />, to: '/dashboard/categories' },
  { text: 'Goals', icon: <EmojiEventsRoundedIcon />, to: '/dashboard/goals' },
  { text: 'AI Assistant', icon: <ElectricBoltRoundedIcon />, to: '/dashboard/ai-assistant' },
];

export default function MenuContent() {
  const transactions = useAppSelector(SelectAllTransactions)
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <StyledNavLink
              to={item.to}
              {...(item.to === '/dashboard' ? { end: true } : {})}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: isActive ? '#803eff' : 'inherit',
                padding: '8px 16px',
                borderRadius: '24px',
                gap: '3%',
                // background: isActive ? 'rgba(128,62,255,0.08)' : 'none',
                fontWeight: isActive ? 600 : 400,
                border: isActive ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
              })}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledNavLink>
          </ListItem>
        ))}
      </List>
      <Stack
      sx={{
        alignItems: 'flex-start', 
        p: 1, 
        m: 1,
      }}
      >
        <Button 
          onClick={() => exportTransactionsToCSV(transactions)}
          sx={{
            color: 'rgba(255, 255, 255, 0.4) !important',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
        >
          Export transactions to CSV
        </Button>
        <Button 
          onClick={() => exportTransactionsToPDF(transactions)}
          sx={{
            color: 'rgba(255, 255, 255, 0.4) !important',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.8)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
        >
          Export transactions to PDF
        </Button>
      </Stack>
    </Stack>
  );
}
