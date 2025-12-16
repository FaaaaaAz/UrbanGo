import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../../config/constants';

export default function Rides() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Viajes</Text>
      <Text style={styles.subtitle}>Aquí verás tu historial de viajes</Text>
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
