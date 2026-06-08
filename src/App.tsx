import { useMemo, useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  Stack,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Filters, { EMPTY_FILTERS, type FilterState } from './components/Filters';
import KpiCards from './components/KpiCards';
import ProductsTable from './components/ProductsTable';
import SalesCharts from './components/SalesCharts';
import { useSales } from './useSales';

// Dashboard de ventas de e-commerce con datos reales desde Firestore.
function App() {
  const { data, loading, error } = useSales();
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  // Opciones de filtro derivadas del dataset.
  const categories = useMemo(() => [...new Set(data.map((s) => s.category))].sort(), [data]);
  const regions = useMemo(() => [...new Set(data.map((s) => s.region))].sort(), [data]);
  const paymentMethods = useMemo(() => [...new Set(data.map((s) => s.paymentMethod))].sort(), [data]);

  // Ventas que cumplen con los filtros activos.
  const filtered = useMemo(
    () =>
      data.filter(
        (s) =>
          (filters.category === 'all' || s.category === filters.category) &&
          (filters.region === 'all' || s.region === filters.region) &&
          (filters.paymentMethod === 'all' || s.paymentMethod === filters.paymentMethod),
      ),
    [data, filters],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {loading && (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error">No se pudieron cargar los datos desde Firestore: {error}</Alert>
        )}

        {!loading && !error && (
          <Grid container spacing={3}>
            <Grid size={12}>
              <Alert severity="info">
                Mostrando {filtered.length} de {data.length} ventas. Usa los filtros para acotar.
              </Alert>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Filters
                value={filters}
                onChange={setFilters}
                categories={categories}
                regions={regions}
                paymentMethods={paymentMethods}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 9 }}>
              <Stack spacing={3}>
                <KpiCards sales={filtered} />
                <SalesCharts sales={filtered} />
                <ProductsTable sales={filtered} />
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
