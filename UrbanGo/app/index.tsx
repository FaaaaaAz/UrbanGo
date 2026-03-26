import { Redirect } from 'expo-router';

export default function Index() {
  // Usar Redirect en lugar de router.replace en useEffect
  return <Redirect href="/splash" />;
}
