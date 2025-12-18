import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelection() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Elige tu Rol</Text>
          <Text style={styles.subtitle}>¿Cómo quieres usar UrbanGo?</Text>
        </View>

        <View style={styles.cardsContainer}>
          {/* Tarjeta Conductor */}
          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => router.push('/(auth)/register-conductor')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: COLORS.primary + '20' }]}>
              <Ionicons name="car-sport" size={40} color={COLORS.primary} />
            </View>
            
            <Text style={styles.roleTitle}>Conductor</Text>
            
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Ionicons name="cash" size={16} color={COLORS.secondary} />
                <Text style={styles.badgeText}>Genera ingresos</Text>
              </View>
            </View>

            <Text style={styles.roleDescription}>
              Comparte tu ruta diaria y convierte tu viaje al trabajo en una fuente de ingresos extra.
            </Text>

            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
                <Text style={styles.benefitText}>Gana 4-6 Bs por viaje</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
                <Text style={styles.benefitText}>Tú defines tu ruta fija</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
                <Text style={styles.benefitText}>Decides cuántos pasajeros</Text>
              </View>
            </View>

            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Registrarme como Conductor</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>

          {/* Tarjeta Pasajero */}
          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => router.push('/(auth)/register-pasajero')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: COLORS.secondary + '20' }]}>
              <Ionicons name="person" size={40} color={COLORS.secondary} />
            </View>
            
            <Text style={styles.roleTitle}>Pasajero</Text>
            
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Ionicons name="wallet" size={16} color={COLORS.secondary} />
                <Text style={styles.badgeText}>Ahorra dinero</Text>
              </View>
            </View>

            <Text style={styles.roleDescription}>
              Encuentra viajes económicos y seguros en rutas que otros conductores ya realizan.
            </Text>

            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
                <Text style={styles.benefitText}>Más barato que taxi</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
                <Text style={styles.benefitText}>Rutas verificadas</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} />
                <Text style={styles.benefitText}>Conductores calificados</Text>
              </View>
            </View>

            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Registrarme como Pasajero</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textLight,
  },
  cardsContainer: {
    gap: SPACING.lg,
  },
  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary + '15',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    gap: SPACING.xs,
  },
  badgeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  roleDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  benefitsList: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  benefitText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 1,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
