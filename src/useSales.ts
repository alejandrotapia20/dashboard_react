import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { Sale } from './types';

// Lee una sola vez la colección "sales" de Firestore.
// Devuelve los datos junto con los estados de carga y error.
export function useSales() {
  const [data, setData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDocs(collection(db, 'sales'))
      .then((snap) => {
        setData(snap.docs.map((d) => d.data() as Sale));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
