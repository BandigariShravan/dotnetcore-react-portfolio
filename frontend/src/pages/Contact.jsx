import { useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, Alert,
  Grid, Paper, Stack
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import api from '../api/axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/contact', form);
      setSuccess("Your message has been sent! I'll get back to you soon.");
      setForm({ name: '', email: '', message: '' });
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>Get In Touch</Typography>
      <Typography variant="body1" color="text.secondary" mb={6}>
        Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 4, height: '100%', bgcolor: '#1a1a2e', color: 'white' }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>Contact Information</Typography>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon sx={{ color: '#e94560' }} />
                <Box>
                  <Typography variant="body2" color="grey.400">Email</Typography>
                  <Typography>contact@devportfolio.com</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <LocationOnIcon sx={{ color: '#e94560' }} />
                <Box>
                  <Typography variant="body2" color="grey.400">Location</Typography>
                  <Typography>San Francisco, CA</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <GitHubIcon sx={{ color: '#e94560' }} />
                <Box>
                  <Typography variant="body2" color="grey.400">GitHub</Typography>
                  <Typography>github.com/devportfolio</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <LinkedInIcon sx={{ color: '#e94560' }} />
                <Box>
                  <Typography variant="body2" color="grey.400">LinkedIn</Typography>
                  <Typography>linkedin.com/in/devportfolio</Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>Send a Message</Typography>
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Your Name" name="name" value={form.name}
                    onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" name="email" type="email"
                    value={form.email} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Message" name="message" multiline rows={6}
                    value={form.message} onChange={handleChange} required
                    placeholder="Tell me about your project or just say hi!" />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}
                    sx={{ py: 1.5, bgcolor: '#1a1a2e', '&:hover': { bgcolor: '#16213e' } }}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
