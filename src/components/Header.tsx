import { AppBar, Toolbar, Box, Typography, Avatar, IconButton } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// Encabezado: título del dashboard, identidad y accesos rápidos.
export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }} variant="rounded">
          <StorefrontIcon />
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.primary', lineHeight: 1.1 }}>
            Dashboard de Productos
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Exploración y análisis de catálogo de e-commerce
          </Typography>
        </Box>
        <IconButton color="inherit">
          <NotificationsNoneIcon />
        </IconButton>
        <Avatar sx={{ width: 36, height: 36 }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
}
