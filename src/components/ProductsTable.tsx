import {
  Paper,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TablePagination,
} from '@mui/material';
import { useState } from 'react';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import type { Sale } from '../types';

// Tabla de detalle del catálogo con datos reales de Firestore y paginación.
const money = (n: number) =>
  n.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });

export default function ProductsTable({ sales }: { sales: Sale[] }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const start = page * rowsPerPage;
  const visible = sales.slice(start, start + rowsPerPage);

  return (
    <Paper sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
        <TableChartOutlinedIcon color="primary" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Detalle de ventas
        </Typography>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Región</TableCell>
            <TableCell align="right">Precio unit.</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visible.map((row) => (
            <TableRow key={row.transactionId} hover>
              <TableCell>{row.productName}</TableCell>
              <TableCell>
                <Chip label={row.category} size="small" color="primary" variant="outlined" />
              </TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell align="right">{money(row.unitPrice)}</TableCell>
              <TableCell align="right">{row.unitsSold}</TableCell>
              <TableCell align="right">{money(row.totalRevenue)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sales.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />
    </Paper>
  );
}
