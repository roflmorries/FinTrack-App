import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import TransactionForm from '../../../features/transactions/TransactionForm';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Modal } from 'antd';

const drawerWidth = 260;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const user = useAppSelector(state => state.user.currentUser);
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
          borderRight: 'none', 
          borderTop: 'none',
          boxShadow: 'none'
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          border: '1px',
          borderRadius: '24px',
          background: 'rgba(128,62,255,0.08)',
        }}
      >
        <Avatar
          sizes="small"
          alt="Avatar"
          src={user?.avatar}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {user?.fullName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {user?.email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
        {/* <CardAlert /> */}
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
      <Button onClick={() => setModal2Open(true)}>+ Add Transaction</Button>
      <Modal
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
      >
        {/* <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 300,
          }}
        > */}
          <TransactionForm onSave={() => setModal2Open(false)} />
        {/* </Box> */}
      </Modal>
      </Stack>
    </Drawer>
  );
}
