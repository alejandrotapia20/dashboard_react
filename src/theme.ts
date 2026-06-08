import { createTheme } from '@mui/material/styles';

// Tema visual del dashboard de E-commerce / Productos.
// Solo define la identidad visual (colores, tipografía, formas).
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#5b3df5' },
    secondary: { main: '#00b8a9' },
    background: {
      default: '#f4f5fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2233',
      secondary: '#6b7088',
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle2: { fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 16px rgba(31, 34, 51, 0.06)',
        },
      },
    },
  },
});

export default theme;
