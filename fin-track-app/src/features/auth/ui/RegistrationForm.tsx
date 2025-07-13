import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../../shared/shared-theme/AppTheme';
import ColorModeSelect from '../../../shared/shared-theme/ColorModeSelect';
import { FacebookIcon, SitemarkIcon } from '../../../pages/RegistrationPage/components/CustomIcons';
import { useEffect, useState } from 'react'
import { registerUser } from '../../../entities/user/model/userThunks';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import { useNavigate } from 'react-router-dom';
import { uploadAvatar } from '../../../shared/api/uploadAvatar';
import GoogleLoginButton from './GoogleLoginButton';
import Avatar from '@mui/material/Avatar';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  borderRadius: `calc(${theme.shape.borderRadius}px + 26px)`,
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(270, 100%, 22%, 0.5), hsl(270, 30%, 5%))',
    }),
  },
}));

export default function RegistrationForm(props: { disableCustomTheme?: boolean }) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard', {replace: true})
    }
  }, [isAuth, navigate])

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    setAvatar(file ? URL.createObjectURL(file) : null);
  };

  const handleRegisterForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = data.get('fullName') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    try {
      let avatar: string = '';
      if (avatarFile) {
        avatar = await uploadAvatar(avatarFile)
      }
      const newUser = { fullName, email, password, avatar };
      console.log(newUser);
      await dispatch(registerUser(newUser));
    } catch (error) {
        console.error(error);
      }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
                        {avatar && (
                // <img
                //   src={avatar}
                //   alt="avatar"
                //   style={{ marginTop: 10, maxWidth: 100, borderRadius: 24, alignSelf: 'flex-end', marginBottom: '1%', position: 'absolute'}}
                // />
                <Avatar
                alt="User Avatar" 
                src={avatar} 
                sx={{
                  alignSelf: 'flex-end', 
                  position: 'absolute', 
                  marginTop: '1%', 
                  height: 100, 
                  width: 100,
                }}
                />
              )}
          <Box
            component="form"
            onSubmit={handleRegisterForm}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="fullName">Full name</FormLabel>
              <TextField
                autoComplete="fullName"
                name="fullName"
                required
                fullWidth
                id="fullName"
                placeholder="Jon Snow"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  }
                }}
                // error={nameError}
                // helperText={nameErrorMessage}
                // color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                // error={emailError}
                // helperText={emailErrorMessage}
                // color={passwordError ? 'error' : 'primary'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  }
                }}
                // error={passwordError}
                // helperText={passwordErrorMessage}
                // color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <Button variant="outlined" component="label" sx={{marginBottom: '2%', borderRadius: '16px'}}>
                Upload Avatar
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUploadAvatar}
                  name="avatar"
                />
              </Button>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{borderRadius: '16px'}}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <GoogleLoginButton/>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
              sx={{borderRadius: '16px'}}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                component='button'
                variant="body2"
                sx={{ alignSelf: 'center' }}
                onClick={() => navigate('/login')}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}