import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';
import TransactionForm from '../../../features/transactions/TransactionForm';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'; // ✅ Заменили импорт
import AddCardIcon from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close'; // ✅ Добавили иконку закрытия

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

// ✅ Стилизованный Dialog
const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: black !important;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px !important;
    color: #fff;
    max-width: 600px;
    width: 100%;
  }
  
  .MuiDialogTitle-root {
    color: #fff !important;
    padding: 24px 24px 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .MuiDialogContent-root {
    padding: 0 24px 24px 24px;
  }
`;

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
        <Button 
          onClick={() => setModal2Open(true)} 
          sx={{
            fontWeight: '600', 
            width: '100%', 
            gap: '10px',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <AddCardIcon/>
          Add Transaction
        </Button>
        
        {/* ✅ Заменили на MUI Dialog */}
        <StyledDialog
          open={modal2Open}
          onClose={() => setModal2Open(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Add New Transaction
            <IconButton
              onClick={() => setModal2Open(false)}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TransactionForm onSave={() => setModal2Open(false)} />
          </DialogContent>
        </StyledDialog>
      </Stack>
    </Drawer>
  );
}