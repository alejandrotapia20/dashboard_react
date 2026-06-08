import { Paper, Typography, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import type { Sale } from '../types';

// Agrupa una métrica numérica por una clave categórica.
function groupSum(sales: Sale[], key: keyof Sale, value: keyof Sale) {
  const map = new Map<string, number>();
  for (const s of sales) {
    const k = String(s[key]);
    map.set(k, (map.get(k) ?? 0) + Number(s[value]));
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

export default function SalesCharts({ sales }: { sales: Sale[] }) {
  const revenueByCategory = groupSum(sales, 'category', 'totalRevenue');
  const revenueByRegion = groupSum(sales, 'region', 'totalRevenue');

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Paper sx={{ p: 2.5 }}>
          <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Ingresos por categoría
          </Typography>
          <BarChart
            height={300}
            xAxis={[{ scaleType: 'band', data: revenueByCategory.map(([c]) => c) }]}
            series={[{ data: revenueByCategory.map(([, v]) => Math.round(v)), label: 'Ingresos (USD)' }]}
          />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <Paper sx={{ p: 2.5 }}>
          <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Ingresos por región
          </Typography>
          <PieChart
            height={300}
            series={[
              {
                data: revenueByRegion.map(([r, v], id) => ({
                  id,
                  label: r,
                  value: Math.round(v),
                })),
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
