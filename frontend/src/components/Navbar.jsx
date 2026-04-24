import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Drawer, List, ListItem, ListItemText, Box, useMediaQuery, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
    ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : []),
  ];

  const NavButtons = () => (
    <>
      {navLinks.map((link) => (
        <Button key={link.path} color="inherit" component={Link} to={link.path} sx={{ mx: 0.5 }}>
          {link.label}
        </Button>
      ))}
      {user ? (
        <Button color="inherit" onClick={handleLogout} variant="outlined" sx={{ ml: 1, borderColor: 'rgba(255,255,255,0.5)' }}>
          Logout ({user.username})
        </Button>
      ) : (
        <Button color="inherit" component={Link} to="/login" variant="outlined" sx={{ ml: 1, borderColor: 'rgba(255,255,255,0.5)' }}>
          Login
        </Button>
      )}
    </>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <Toolbar>
          <CodeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            DevPortfolio
          </Typography>
          {isMobile ? (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box><NavButtons /></Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250, pt: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.path} component={Link} to={link.path} onClick={() => setDrawerOpen(false)} sx={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
          <ListItem>
            {user ? (
              <Button fullWidth onClick={() => { handleLogout(); setDrawerOpen(false); }} variant="outlined">
                Logout
              </Button>
            ) : (
              <Button fullWidth component={Link} to="/login" onClick={() => setDrawerOpen(false)} variant="outlined">
                Login
              </Button>
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
