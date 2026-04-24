import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Chip, Stack, CircularProgress,
  Alert, Paper, Divider, Grid
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../api/axios';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(() => setError('Project not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
  if (error) return <Container sx={{ py: 6 }}><Alert severity="error">{error}</Alert></Container>;
  if (!project) return null;

  const stack = project.stack ? project.stack.split(',').map(s => s.trim()) : [];
  const tags = project.tags ? project.tags.split(',').map(t => t.trim()) : [];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/projects')} sx={{ mb: 3 }}>
        Back to Projects
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          {project.imageUrl && (
            <Box component="img" src={project.imageUrl} alt={project.title}
              sx={{ width: '100%', borderRadius: 2, boxShadow: 4, mb: 3 }} />
          )}
          <Typography variant="h3" fontWeight="bold" gutterBottom>{project.title}</Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
            {project.description}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" spacing={2}>
            {project.gitHubUrl && (
              <Button variant="contained" startIcon={<GitHubIcon />} href={project.gitHubUrl} target="_blank"
                sx={{ bgcolor: '#24292e', '&:hover': { bgcolor: '#1a1f24' } }}>
                View on GitHub
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="contained" startIcon={<LaunchIcon />} href={project.demoUrl} target="_blank" color="primary">
                Live Demo
              </Button>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Tech Stack</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {stack.map(s => <Chip key={s} label={s} color="primary" variant="outlined" />)}
            </Stack>
          </Paper>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Tags</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {tags.map(t => <Chip key={t} label={`#${t}`} variant="filled" sx={{ bgcolor: 'grey.100' }} />)}
            </Stack>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Project Info</Typography>
            <Typography variant="body2" color="text.secondary">
              Added: {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
