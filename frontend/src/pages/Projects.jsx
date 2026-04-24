import { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Grid, TextField, Box, CircularProgress, Alert, InputAdornment, Chip, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProjectCard from '../components/ProjectCard';
import api from '../api/axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    api.get('/projects')
      .then(res => { setProjects(res.data); })
      .catch(() => setError('Failed to load projects. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = projects;
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.stack.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedTag) {
      result = result.filter(p => p.tags.toLowerCase().includes(selectedTag.toLowerCase()));
    }
    return result;
  }, [search, selectedTag, projects]);

  const allTags = [...new Set(projects.flatMap(p => p.tags.split(',').map(t => t.trim()).filter(Boolean)))];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>Projects</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        A collection of projects I&apos;ve built showcasing various technologies.
      </Typography>

      <Box mb={4}>
        <TextField fullWidth placeholder="Search projects..." variant="outlined"
          value={search} onChange={e => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" flexWrap="wrap" gap={1}>
          <Chip label="All" onClick={() => setSelectedTag('')} color={selectedTag === '' ? 'primary' : 'default'} />
          {allTags.map(tag => (
            <Chip key={tag} label={tag} onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              color={selectedTag === tag ? 'primary' : 'default'} />
          ))}
        </Stack>
      </Box>

      {loading && <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && filtered.length === 0 && (
        <Typography color="text.secondary" textAlign="center" mt={6}>No projects found.</Typography>
      )}

      <Grid container spacing={3}>
        {filtered.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
