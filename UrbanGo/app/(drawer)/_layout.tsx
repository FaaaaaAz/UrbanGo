import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../config/constants';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textLight,
        headerTintColor: COLORS.white,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Inicio',
          title: 'UrbanGo',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="chat"
        options={{
          drawerLabel: 'Mensajes',
          title: 'Chat',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Configuración',
          title: 'Configuración',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: 'Acerca de',
          title: 'Acerca de UrbanGo',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="logout"
        options={{
          drawerLabel: 'Cerrar Sesión',
          title: 'Cerrar Sesión',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notification-test"
        options={{
          drawerLabel: 'Test Notificaciones',
          title: 'Test Notificaciones',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(admin)"
        options={{
          drawerLabel: 'Admin',
          title: 'Administración',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shield" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
