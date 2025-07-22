import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { userLogOut } from '../../../entities/user/model/userThunks';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import Stack from '@mui/material/Stack';

type Props = {}

export default function UserInfo({}: Props) {

    const avatar = useAppSelector(state => state.user.currentUser?.avatar);
    const fullName = useAppSelector(state => state.user.currentUser?.fullName);
    const email = useAppSelector(state => state.user.currentUser?.email);
    const dispatch = useAppDispatch()

      const handleUserLogOut = () => {
        dispatch(userLogOut());
      }
  return (
      <Stack
        direction="row"
        sx={{
          // p: 1,
          marginLeft: '2%',
          gap: 1,
          alignItems: 'center',
          // backgroundColor: 'grey',
          // borderRadius: '24px'
        }}
      >
        <Avatar
          sizes="small"
          alt="Avatar"
          src={avatar}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' , width: '140px'}}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {fullName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {email}
          </Typography>
        </Box>
        <Button 
          onClick={handleUserLogOut} 
          variant='text'   
          sx={{
            minWidth: 36, 
            width: 36, 
            height: 36,
            padding: 0,
            borderRadius: 1,
          }}>
            <LogoutRoundedIcon fontSize="small" />
        </Button>
      </Stack>
  )
}