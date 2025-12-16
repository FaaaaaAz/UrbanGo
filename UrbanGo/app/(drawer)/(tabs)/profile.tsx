import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../../config/constants';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>Usuario</Text>
        <Text style={styles.email}>usuario@example.com</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Mi Vehículo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Método de Pago</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    fontWeight: '500',
  },
});
