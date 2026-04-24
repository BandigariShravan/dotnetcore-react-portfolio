import { Card, CardContent, CardMedia, CardActions, Typography, Button, Chip, Box, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const tags = project.tags ? project.tags.split(',').map(t => t.trim()) : [];
  const stack = project.stack ? project.stack.split(',').map(s => s.trim()) : [];

  return (
    <Card sx={{
      height: '100%', display: 'flex', flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
    }}>
      {project.imageUrl && (
        <CardMedia component="img" height="180" image={project.imageUrl} alt={project.title} />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">{project.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">STACK</Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} mt={0.5}>
            {stack.map(s => (
              <Chip key={s} label={s} size="small" color="primary" variant="outlined" />
            ))}
          </Stack>
        </Box>
        <Stack direction="row" flexWrap="wrap" gap={0.5} mt={1}>
          {tags.map(tag => (
            <Chip key={tag} label={`#${tag}`} size="small" variant="filled" sx={{ bgcolor: 'grey.100', fontSize: '0.7rem' }} />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button size="small" component={Link} to={`/projects/${project.id}`} variant="contained">
          View Details
        </Button>
        {project.gitHubUrl && (
          <Button size="small" startIcon={<GitHubIcon />} href={project.gitHubUrl} target="_blank" rel="noopener">
            GitHub
          </Button>
        )}
        {project.demoUrl && (
          <Button size="small" startIcon={<LaunchIcon />} href={project.demoUrl} target="_blank" rel="noopener">
            Demo
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
