import { useAppDispatch } from '../../../shared/lib/hooks/redux/reduxTypes'
import { useNavigate } from 'react-router-dom';
import { signInUserWithFacebook } from '../../../entities/user/model/userThunks';
import { Button } from '@mui/material';
import { FacebookIcon } from '../../../pages/LoginPage/components/CustomIcons';

type Props = {}

export default function FacebookLoginButton({}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogInByFacebook = async () => {
    try {
      const resultAction = await dispatch(signInUserWithFacebook());
      if (signInUserWithFacebook.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      } else {
        console.error('Login error:', resultAction.payload);
      }
    } catch (error: any) {
      console.error('Facebook auth error:', error);
    }
  }

  return (
    <Button 
    fullWidth
    variant="outlined"
    startIcon={<FacebookIcon />}
    onClick={handleLogInByFacebook} 
    sx={{ borderRadius: '16px' }}
    >Sign in with Facebook</Button>
  )
}