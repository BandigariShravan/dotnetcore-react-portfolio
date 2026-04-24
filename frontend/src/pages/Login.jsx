import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button,
  Box, Alert, Divider, InputAdornment, IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token, { username: res.data.username, role: res.data.role });
      navigate(res.data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 5 }}>
        <Box textAlign="center" mb={4}>
          <Box sx={{ bgcolor: '#1a1a2e', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <LockOutlinedIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h4" fontWeight="bold">Welcome Back</Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>Sign in to your account</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Username" name="username" value={form.username}
            onChange={handleChange} required sx={{ mb: 2 }} autoComplete="username" />
          <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'}
            value={form.password} onChange={handleChange} required sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }} />
          <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}
            sx={{ py: 1.5, bgcolor: '#1a1a2e', '&:hover': { bgcolor: '#16213e' }, mb: 2 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>
          <Typography variant="caption" color="text.secondary">Demo Credentials</Typography>
        </Divider>
        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Admin: <strong>admin</strong> / <strong>Admin@123</strong>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
