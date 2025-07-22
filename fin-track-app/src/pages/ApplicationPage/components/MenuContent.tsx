import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
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
            <NavLink
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
                background: isActive ? 'rgba(128,62,255,0.08)' : 'none',
                fontWeight: isActive ? 600 : 400,
              })}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </NavLink>
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
