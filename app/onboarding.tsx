import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../config/constants';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🚗</Text>
        <Text style={styles.title}>¿Cómo quieres usar UrbanGo?</Text>
        <Text style={styles.subtitle}>
          Elige tu rol para comenzar a disfrutar de nuestros servicios
        </Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/(auth)/register?role=conductor')}
          >
            <Text style={styles.cardEmoji}>🚘</Text>
            <Text style={styles.cardTitle}>Soy Conductor</Text>
            <Text style={styles.cardDescription}>
              Gana dinero extra compartiendo tu ruta diaria
            </Text>
            <View style={styles.cardBadge}>
              <Text style={styles.cardBadgeText}>4-6 Bs por viaje</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push('/(auth)/register?role=pasajero')}
          >
            <Text style={styles.cardEmoji}>👤</Text>
            <Text style={styles.cardTitle}>Soy Pasajero</Text>
            <Text style={styles.cardDescription}>
              Encuentra rutas compartidas económicas y rápidas
            </Text>
            <View style={styles.cardBadge}>
              <Text style={styles.cardBadgeText}>Más barato que taxi</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.skipText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    paddingTop: 60,
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  cardContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  cardBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  cardBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  skipText: {
    color: COLORS.textLight,
    fontSize: FONT_SIZES.md,
    textDecorationLine: 'underline',
  },
});
