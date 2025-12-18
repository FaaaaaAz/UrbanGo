// Configuración de la API
export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://localhost:3000/api' 
    : 'https://api.urbango.com/api',
  TIMEOUT: 10000,
};

// Configuración de mapas
export const MAPS_CONFIG = {
  INITIAL_REGION: {
    latitude: -17.3895, // La Paz, Bolivia
    longitude: -66.1568,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
};

// Precios
export const PRICING = {
  MIN_PRICE: 4,
  MAX_PRICE: 6,
  TRANSPORT_PUBLIC_PRICE: 2.5,
  TAXI_BASE_PRICE: 15,
};

// Colores de la app - Paleta profesional para carpooling urbano
export const COLORS = {
  primary: '#1E3A5F', // Azul petróleo - confianza y seguridad
  primaryDark: '#152B45',
  primaryLight: '#2A4F7A',
  secondary: '#2ECC71', // Verde urbano - acción, "go", progreso
  secondaryDark: '#27AE60',
  secondaryLight: '#58D68D',
  accent: '#2ECC71', // Verde para acciones principales
  background: '#F2F4F7', // Gris claro - fondos
  backgroundLight: '#FFFFFF',
  backgroundDark: '#E8EBF0',
  card: '#FFFFFF',
  text: '#4A4A4A', // Gris oscuro - texto principal
  textLight: '#7A7A7A',
  textSecondary: '#A0A0A0',
  white: '#FFFFFF',
  black: '#000000',
  error: '#E74C3C',
  success: '#2ECC71',
  warning: '#F39C12',
  info: '#3498DB',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Tamaños y espaciados
export const SIZES = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Fuentes
export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  huge: 32,
};

// Border radius
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Sombras
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};
