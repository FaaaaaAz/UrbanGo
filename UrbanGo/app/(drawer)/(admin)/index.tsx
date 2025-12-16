import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../../config/constants';

export default function AdminIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛡️</Text>
      <Text style={styles.title}>Panel de Administración</Text>
      <Text style={styles.subtitle}>Solo para administradores</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
