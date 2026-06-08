// Estructura de un registro de venta tal como vive en la colección "sales" de Firestore.
export interface Sale {
  transactionId: number;
  date: string;
  category: string;
  productName: string;
  unitsSold: number;
  unitPrice: number;
  totalRevenue: number;
  region: string;
  paymentMethod: string;
}
