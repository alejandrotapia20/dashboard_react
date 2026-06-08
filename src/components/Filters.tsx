import {
  Paper,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Box,
  Button,
  Divider,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

// Estado de los filtros que el dashboard aplica sobre las ventas.
export interface FilterState {
  category: string;
  region: string;
  paymentMethod: string;
}

export const EMPTY_FILTERS: FilterState = {
  category: 'all',
  region: 'all',
  paymentMethod: 'all',
};

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
  categories: string[];
  regions: string[];
  paymentMethods: string[];
}

export default function Filters({ value, onChange, categories, regions, paymentMethods }: Props) {
  const set = (key: keyof FilterState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [key]: e.target.value });

  return (
    <Paper sx={{ p: 2.5, height: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
        <FilterAltOutlinedIcon color="primary" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Filtros
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <TextField select label="Categoría" value={value.category} onChange={set('category')} size="small" fullWidth>
          <MenuItem value="all">Todas las categorías</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </TextField>

        <TextField select label="Región" value={value.region} onChange={set('region')} size="small" fullWidth>
          <MenuItem value="all">Todas las regiones</MenuItem>
          {regions.map((r) => (
            <MenuItem key={r} value={r}>{r}</MenuItem>
          ))}
        </TextField>

        <TextField select label="Método de pago" value={value.paymentMethod} onChange={set('paymentMethod')} size="small" fullWidth>
          <MenuItem value="all">Todos</MenuItem>
          {paymentMethods.map((p) => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </TextField>

        <Divider />

        <Box>
          <Button variant="outlined" fullWidth onClick={() => onChange(EMPTY_FILTERS)}>
            Limpiar filtros
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
