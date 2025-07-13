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

const mainListItems = [
  { text: 'Dashboard', icon: <DashboardCustomizeRoundedIcon />, to: '/dashboard' },
  { text: 'Transactions', icon: <AccountBalanceRoundedIcon />, to: '/dashboard/transactions' },
  { text: 'Categories', icon: <CategoryRoundedIcon />, to: '/dashboard/categories' },
  { text: 'Goals', icon: <EmojiEventsRoundedIcon />, to: '/dashboard/goals' },
  { text: 'AI Assistant', icon: <ElectricBoltRoundedIcon />, to: '/dashboard/ai-assistant' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, to: '/dashboard/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, to: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, to: '/dashboard/feedback' },
];

export default function MenuContent() {
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
                color: isActive ? 'purple' : 'inherit',
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
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
