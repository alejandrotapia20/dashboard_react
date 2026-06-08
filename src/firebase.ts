// Conexión a Firebase. Estas claves web son públicas por diseño
// (van en el navegador); la seguridad real se define en las reglas de Firestore.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 👇 REEMPLAZA con el firebaseConfig de tu proyecto
// (Firebase Console → Configuración del proyecto → Tus apps → app web)
const firebaseConfig = {
  apiKey: 'AIzaSyCwAAKluB9XjW9dPOIw4ZHIFSAz2m3XoHk',
  authDomain: 'dashboard-react-aedef.firebaseapp.com',
  projectId: 'dashboard-react-aedef',
  storageBucket: 'dashboard-react-aedef.firebasestorage.app',
  messagingSenderId: '445110567796',
  appId: '1:445110567796:web:4f08c11b2dadb0a8932221',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
