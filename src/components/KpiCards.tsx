import { Paper, Typography, Stack, Box, Grid } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import type { SvgIconComponent } from '@mui/icons-material';
import type { Sale } from '../types';

// Indicadores (KPIs) calculados a partir de las ventas reales filtradas.
interface Kpi {
  label: string;
  value: string;
  icon: SvgIconComponent;
}

const money = (n: number) =>
  n.toLocaleString('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function KpiCards({ sales }: { sales: Sale[] }) {
  const totalRevenue = sales.reduce((acc, s) => acc + s.totalRevenue, 0);
  const totalUnits = sales.reduce((acc, s) => acc + s.unitsSold, 0);
  const categories = new Set(sales.map((s) => s.category)).size;
  const avgPrice = sales.length
    ? sales.reduce((acc, s) => acc + s.unitPrice, 0) / sales.length
    : 0;

  const kpis: Kpi[] = [
    { label: 'Transacciones', value: sales.length.toLocaleString('es-EC'), icon: Inventory2OutlinedIcon },
    { label: 'Precio promedio', value: money(avgPrice), icon: SellOutlinedIcon },
    { label: 'Categorías', value: String(categories), icon: CategoryOutlinedIcon },
    { label: 'Ingresos totales', value: money(totalRevenue), icon: PaidOutlinedIcon },
  ];

  void totalUnits; // (disponible por si se quiere mostrar otro KPI)

  return (
    <Grid container spacing={2.5}>
      {kpis.map(({ label, value, icon: Icon }) => (
        <Grid key={label} size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                <Icon />
              </Box>
              <Box>
                <Typography variant="h5">{value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
