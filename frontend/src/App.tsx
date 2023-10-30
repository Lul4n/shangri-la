import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  styled,
  Toolbar,
  Typography
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon
} from "@mui/icons-material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useTranslation} from "react-i18next";
import Welcome from "./Welcome.tsx";
import Login from "./Login.tsx";
import React from "react";
import Navigation from "./Navigation.tsx";
import CreateAccount from "./CreateAccount.tsx";


const drawerWidth: number = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
          },
        }),
      },
    }),
);

function App() {
  const {t} = useTranslation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <BrowserRouter basename="/frontend/">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <IconButton size="large" edge="start" onClick={toggleMenu} sx={{mr:3}}>
              <MenuIcon sx={{...(menuOpen && { display: 'none' })}} />
              <MenuOpenIcon sx={{display:'none',...(menuOpen && { display: 'block' })}} />
            </IconButton>
            <Typography variant="h5" sx={{display: {xs: 'none', md: 'block'}}} >{t('title.long')}</Typography>
            <Typography variant="h5" sx={{display: { xs: 'block', md: 'none'}}} >{t('title.short')}</Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={menuOpen} sx={{height: '100vh', zIndex: 0}}>
          <Toolbar />
          <Navigation />
        </Drawer>
        <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
        >
          <Container sx={{ mt: 14, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App