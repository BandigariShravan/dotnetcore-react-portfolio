import { Box, Container, Typography, Button, Grid, Paper, Avatar, Stack, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';

const skills = [
  { icon: <CodeIcon fontSize="large" />, title: 'Frontend', items: ['React', 'TypeScript', 'Material-UI', 'Vite'] },
  { icon: <StorageIcon fontSize="large" />, title: 'Backend', items: ['ASP.NET Core', 'Entity Framework', 'REST APIs', 'SignalR'] },
  { icon: <StorageIcon fontSize="large" />, title: 'Database', items: ['SQL Server', 'PostgreSQL', 'SQLite', 'Redis'] },
  { icon: <CloudIcon fontSize="large" />, title: 'DevOps', items: ['Docker', 'GitHub Actions', 'Azure', 'CI/CD'] },
];

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white', py: { xs: 10, md: 16 }, px: 2, textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 3, bgcolor: '#e94560', fontSize: '2.5rem', fontWeight: 'bold' }}>
            DP
          </Avatar>
          <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}>
            Full-Stack Developer
          </Typography>
          <Typography variant="h5" sx={{ color: '#a8b2d8', mb: 2, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
            Building modern web applications with .NET Core &amp; React
          </Typography>
          <Typography variant="body1" sx={{ color: '#8892b0', mb: 4, maxWidth: 600, mx: 'auto' }}>
            Passionate about creating scalable, performant, and user-friendly applications.
            Specializing in ASP.NET Core APIs and React frontends.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" size="large" component={Link} to="/projects"
              sx={{ bgcolor: '#e94560', '&:hover': { bgcolor: '#c73652' }, px: 4 }}>
              View Projects
            </Button>
            <Button variant="outlined" size="large" component={Link} to="/contact"
              sx={{ borderColor: '#a8b2d8', color: '#a8b2d8', '&:hover': { borderColor: 'white', color: 'white' }, px: 4 }}>
              Contact Me
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Skills Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
          Technical Skills
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
          Technologies I work with to build great products
        </Typography>
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={3} key={skill.title}>
              <Paper elevation={2} sx={{
                p: 3, textAlign: 'center', height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
              }}>
                <Box sx={{ color: '#e94560', mb: 2 }}>{skill.icon}</Box>
                <Typography variant="h6" fontWeight="bold" mb={2}>{skill.title}</Typography>
                <Stack spacing={1} alignItems="center">
                  {skill.items.map(item => (
                    <Chip key={item} label={item} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 10, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight="bold" gutterBottom>Interested in working together?</Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </Typography>
          <Button variant="contained" size="large" component={Link} to="/contact"
            sx={{ bgcolor: '#1a1a2e', '&:hover': { bgcolor: '#16213e' }, px: 6 }}>
            Get In Touch
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
