import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
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
import { SitemarkIcon } from '../../../pages/RegistrationPage/components/CustomIcons';
import { useState } from 'react';
import { resetPassword } from '../../../shared/config/authReset';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

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

const ResetContainer = styled(Stack)(({ theme }) => ({
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

export default function ResetPasswordForm(props: { disableCustomTheme?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;

    try {
      setLoading(true);
      setMessage(null);
      await resetPassword(email);
      setMessage({ type: 'success', text: 'Проверьте почту для восстановления пароля' });
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Ошибка при сбросе пароля' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <ResetContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Reset Password
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}
          >
            Enter your email address and we'll send you a link to reset your password.
          </Typography>

          {message && (
            <Alert severity={message.type} sx={{ borderRadius: '16px' }}>
              {message.text}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleResetPassword}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                type="email"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  }
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ borderRadius: '16px' }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Remember your password?{' '}
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: 'center' }}
                onClick={() => navigate('/login')}
              >
                Sign in
              </Link>
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: 'center' }}
                onClick={() => navigate('/registration')}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </ResetContainer>
    </AppTheme>
  );
}