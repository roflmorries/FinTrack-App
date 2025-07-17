import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';
import TransactionForm from '../../../features/transactions/TransactionForm';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Modal } from 'antd';
import AddCardIcon from '@mui/icons-material/AddCard';

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
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'black',
          borderRight: 'none', 
          borderTop: 'none',
          boxShadow: 'none',
        },
      }}
    >
            <Stack
        direction="row"
        sx={{
          p: 2,
          paddingBottom: 0,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <img src='/siteMark.svg' style={{ width: '150px', height: '52px' }}/>
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
      <Button onClick={() => setModal2Open(true)} sx={{fontWeight: '600', width: '100%', gap: '10px'}}><AddCardIcon/>Add Transaction</Button>
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
