import { Box, Typography, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1a1a2e', color: 'white', py: 4, mt: 'auto' }}>
      <Stack direction="column" alignItems="center" spacing={1}>
        <Typography variant="body1" fontWeight="bold">DevPortfolio</Typography>
        <Stack direction="row" spacing={2}>
          <Link href="https://github.com" target="_blank" color="inherit"><GitHubIcon /></Link>
          <Link href="https://linkedin.com" target="_blank" color="inherit"><LinkedInIcon /></Link>
          <Link href="mailto:contact@portfolio.com" color="inherit"><EmailIcon /></Link>
        </Stack>
        <Typography variant="caption" color="grey.400">
          © {new Date().getFullYear()} DevPortfolio. Built with ASP.NET Core + React.
        </Typography>
      </Stack>
    </Box>
  );
}
