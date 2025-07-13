import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
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
import { FacebookIcon, SitemarkIcon } from '../../../pages/LoginPage/components/CustomIcons';
import { useState } from 'react';
import GoogleLoginButton from "./GoogleLoginButton"
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/redux/reduxTypes"
import { loginUser } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { browserLocalPersistence, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../../../shared/config/firebase";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  borderRadius: `calc(${theme.shape.borderRadius}px + 26px)`,
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function LoginForm(props: { disableCustomTheme?: boolean }) {
  // const [emailError, setEmailError] = useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = useState('');
  // const [passwordError, setPasswordError] = useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  // const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, error} = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard')
    }
  }, [isAuth, navigate]);

  const handleLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const rememberMe = Boolean(data.get('rememberMe'));

    setLoading(true);
    try {
      await setPersistence(
        auth, rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await dispatch(loginUser({ email, password}));
    } catch(error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false);
    }
  }



  // const validateInputs = () => {
  //   const email = document.getElementById('email') as HTMLInputElement;
  //   const password = document.getElementById('password') as HTMLInputElement;

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage('Please enter a valid email address.');
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage('');
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage('Password must be at least 6 characters long.');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   }

  //   return isValid;
  // };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
          >
            Sign in
          </Typography>
          {error && <Typography color="error">Ошибка: {error}</Typography>}
          <Box
            component="form"
            onSubmit={handleLoginForm}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                // autoFocus
                required
                fullWidth
                variant="outlined"
                // color={emailError ? 'error' : 'primary'}
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
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={error ? 'error' : 'primary'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px', // твой радиус
                  }
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="rememberMe" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ borderRadius: '16px' }}
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/reset-password')}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <GoogleLoginButton/>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
              sx={{ borderRadius: '16px' }}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                component='button'
                variant="body2"
                sx={{ alignSelf: 'center' }}
                onClick={() => navigate('/registration')}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}