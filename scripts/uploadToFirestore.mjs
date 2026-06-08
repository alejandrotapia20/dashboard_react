// Sube data/online_sales.json a la colección "sales" de Firestore.
// Uso (1 sola vez): node scripts/uploadToFirestore.mjs
//
// Requisitos:
//   1. npm install firebase
//   2. Pega tu firebaseConfig abajo (Firebase Console → Configuración → Tus apps).
//   3. Reglas de Firestore en "modo de prueba" (permiten escritura temporalmente).

import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';

// 👇 REEMPLAZA con el firebaseConfig de tu proyecto
const firebaseConfig = {
  apiKey: 'AIzaSyCwAAKluB9XjW9dPOIw4ZHIFSAz2m3XoHk',
  authDomain: 'dashboard-react-aedef.firebaseapp.com',
  projectId: 'dashboard-react-aedef',
  storageBucket: 'dashboard-react-aedef.firebasestorage.app',
  messagingSenderId: '445110567796',
  appId: '1:445110567796:web:4f08c11b2dadb0a8932221',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rows = JSON.parse(readFileSync(new URL('../data/online_sales.json', import.meta.url)));

// Firestore limita los batches a 500 operaciones; partimos por si acaso.
const CHUNK = 500;
let total = 0;
for (let i = 0; i < rows.length; i += CHUNK) {
  const batch = writeBatch(db);
  for (const row of rows.slice(i, i + CHUNK)) {
    // Usamos el transactionId como ID del documento (evita duplicados al re-ejecutar).
    batch.set(doc(db, 'sales', String(row.transactionId)), row);
  }
  await batch.commit();
  total += Math.min(CHUNK, rows.length - i);
  console.log(`Subidas ${total}/${rows.length}...`);
}

console.log('✅ Listo. Colección "sales" poblada en Firestore.');
process.exit(0);
