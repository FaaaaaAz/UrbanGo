import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../config/constants';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🚗</Text>
        <Text style={styles.title}>UrbanGo</Text>
        <Text style={styles.version}>Versión 1.0.0</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de</Text>
          <Text style={styles.text}>
            UrbanGo es una plataforma innovadora que transforma vehículos particulares 
            en transporte compartido durante horas pico.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Misión</Text>
          <Text style={styles.text}>
            Conectar conductores con rutas definidas con pasajeros que necesitan 
            movilizarse en la misma dirección, ofreciendo una alternativa económica 
            y conveniente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          <Text style={styles.text}>Email: info@urbango.com</Text>
          <Text style={styles.text}>Teléfono: +591 123 4567</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  version: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
  },
  section: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  text: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: SPACING.xs,
  },
});
