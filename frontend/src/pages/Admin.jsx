import { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Box, Alert, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Chip, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/axios';

const emptyForm = { id: 0, title: '', description: '', stack: '', demoUrl: '', gitHubUrl: '', imageUrl: '', tags: '' };

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchProjects = () => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => setError('Failed to load projects.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleOpen = (project = null) => {
    setForm(project ? { ...project } : emptyForm);
    setEditMode(!!project);
    setDialogOpen(true);
    setError('');
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      if (editMode) {
        await api.put(`/projects/${form.id}`, form);
        setSuccess('Project updated successfully!');
      } else {
        await api.post('/projects', form);
        setSuccess('Project created successfully!');
      }
      setDialogOpen(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/projects/${deleteId}`);
      setSuccess('Project deleted successfully!');
      setDeleteDialogOpen(false);
      fetchProjects();
    } catch {
      setError('Failed to delete project.');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Admin Panel</Typography>
          <Typography variant="body2" color="text.secondary">Manage your portfolio projects</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}
          sx={{ bgcolor: '#1a1a2e', '&:hover': { bgcolor: '#16213e' } }}>
          Add Project
        </Button>
      </Box>

      {success && <Alert severity="success" onClose={() => setSuccess('')} sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead sx={{ bgcolor: '#1a1a2e' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stack</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tags</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Typography fontWeight="medium">{p.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {p.stack.split(',').slice(0, 3).map(s => (
                        <Chip key={s} label={s.trim()} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {p.tags.split(',').slice(0, 2).map(t => (
                        <Chip key={t} label={t.trim()} size="small" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleOpen(p)} color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => { setDeleteId(p.id); setDeleteDialogOpen(true); }} color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={form.description}
                onChange={handleChange} multiline rows={3} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Stack (comma-separated)" name="stack" value={form.stack}
                onChange={handleChange} placeholder="React,Node.js,MongoDB" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Tags (comma-separated)" name="tags" value={form.tags}
                onChange={handleChange} placeholder="fullstack,react,api" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Demo URL" name="demoUrl" value={form.demoUrl || ''}
                onChange={handleChange} placeholder="https://demo.example.com" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="GitHub URL" name="gitHubUrl" value={form.gitHubUrl || ''}
                onChange={handleChange} placeholder="https://github.com/user/repo" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Image URL" name="imageUrl" value={form.imageUrl || ''}
                onChange={handleChange} placeholder="https://images.unsplash.com/..." />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}
            sx={{ bgcolor: '#1a1a2e', '&:hover': { bgcolor: '#16213e' } }}>
            {saving ? 'Saving...' : editMode ? 'Update Project' : 'Create Project'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this project? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
