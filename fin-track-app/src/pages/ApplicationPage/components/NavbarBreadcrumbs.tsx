import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

const TAB_NAMES: Record<string, string> = {
  '/dashboard': 'Home',
  '/dashboard/transactions': 'Transactions',
  '/dashboard/categories': 'Categories',
  '/dashboard/goals': 'Goals',
  '/dashboard/ai-assistant': 'AI Assistant',
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const activeTab = TAB_NAMES[location.pathname] || 'Dashboard';
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {activeTab}
      </Typography>
    </StyledBreadcrumbs>
  );
}
