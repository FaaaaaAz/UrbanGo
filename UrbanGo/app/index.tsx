import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir inmediatamente al splash screen
    router.replace('/splash');
  }, []);

  // Retornar null ya que este componente solo redirige
  return null;
}
