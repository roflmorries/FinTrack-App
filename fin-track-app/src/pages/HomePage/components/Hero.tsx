import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const [show, setShow] = useState([false, false, false, false]);
  const navigate = useNavigate();

  useEffect(() => {
    [0, 1, 2, 3].forEach((i) => {
      setTimeout(() => {
        setShow((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 300 + i * 350);
    });
  }, []);
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, #803eff, transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, #803eff, transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Fade in={show[0]} timeout={900}>
            <Typography
              variant="h1"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              }}
            >
              Your money, your&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={(theme) => ({
                  fontSize: 'inherit',
                  color: 'primary.main',
                  ...theme.applyStyles('dark', {
                    color: '#813fff',
                  }),
                })}
              >
                rules.
              </Typography>
            </Typography>
          </Fade>
          <Fade in={show[1]} timeout={900}>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                width: { sm: '100%', md: '80%' },
              }}
            >
              Explore our cutting-edge dashboard, delivering high-quality solutions
              tailored to your needs. Elevate your experience with top-tier features
              and services.
            </Typography>
          </Fade>
          <Fade in={show[2]} timeout={900}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
            >
              <Button 
              color="primary" 
              variant="outlined" 
              size="small" 
              fullWidth 
              sx={{ borderRadius: '24px' }}
              onClick={() => navigate('/login')}
              >
                Sign in
              </Button>
              <Button 
              color="primary" 
              variant="contained" 
              size="small"
              fullWidth 
              sx={{ borderRadius: '24px' }}
              onClick={() => navigate('/registration')}
              >
                Sign up
              </Button>
            </Stack>
          </Fade>
          <Fade in={show[3]} timeout={900}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              By clicking &quot;Sign In / Sign Up&quot; you agree to our&nbsp;
              <Link href="#" color="primary">
                Terms & Conditions
              </Link>
              .
            </Typography>
          </Fade>
        </Stack>
        <StyledBox id="image" />
      </Container>
    </Box>
  );
}