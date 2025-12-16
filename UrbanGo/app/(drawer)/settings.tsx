import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../config/constants';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Text style={styles.subtitle}>Personaliza tu experiencia</Text>
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
