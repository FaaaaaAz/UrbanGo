import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';

// Mock data para historial
const historialViajes = [
  {
    id: 1,
    fecha: '2025-12-18',
    ruta: 'Sopocachi → Obrajes',
    pasajeros: 2,
    ganancia: 10,
  },
  {
    id: 2,
    fecha: '2025-12-17',
    ruta: 'Sopocachi → Obrajes',
    pasajeros: 3,
    ganancia: 15,
  },
  {
    id: 3,
    fecha: '2025-12-16',
    ruta: 'Centro → Calacoto',
    pasajeros: 2,
    ganancia: 12,
  },
];

export default function ConductorEarnings() {
  const gananciasHoy = 10;
  const gananciasSemana = 37;
  const estimacionRuta = 15;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mis Ingresos</Text>
          <Text style={styles.headerSubtitle}>Sigue ganando y creciendo</Text>
        </View>

        <View style={styles.content}>
          {/* Ganancias Cards */}
          <View style={styles.earningsGrid}>
            <View style={styles.earningCard}>
              <View style={styles.earningIcon}>
                <Ionicons name="calendar-outline" size={24} color={COLORS.secondary} />
              </View>
              <Text style={styles.earningLabel}>Hoy</Text>
              <Text style={styles.earningValue}>{gananciasHoy} Bs</Text>
            </View>

            <View style={styles.earningCard}>
              <View style={styles.earningIcon}>
                <Ionicons name="stats-chart-outline" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.earningLabel}>Esta Semana</Text>
              <Text style={styles.earningValue}>{gananciasSemana} Bs</Text>
            </View>
          </View>

          {/* Estimación */}
          <View style={styles.estimacionCard}>
            <View style={styles.estimacionHeader}>
              <Ionicons name="trending-up" size={32} color={COLORS.secondary} />
              <View style={styles.estimacionInfo}>
                <Text style={styles.estimacionTitle}>Estimación</Text>
                <Text style={styles.estimacionSubtitle}>Completa tu ruta de hoy</Text>
              </View>
            </View>
            <View style={styles.estimacionAmount}>
              <Text style={styles.estimacionLabel}>Ganarás aproximadamente</Text>
              <Text style={styles.estimacionValue}>+{estimacionRuta} Bs</Text>
            </View>
          </View>

          {/* Gamificación */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tus Logros</Text>
            
            <View style={styles.achievementsContainer}>
              <View style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Ionicons name="star" size={32} color="#FFB800" />
                </View>
                <Text style={styles.achievementTitle}>Conductor Frecuente</Text>
                <Text style={styles.achievementDesc}>10+ viajes este mes</Text>
              </View>

              <View style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: COLORS.secondary + '20' }]}>
                  <Ionicons name="flash" size={32} color={COLORS.secondary} />
                </View>
                <Text style={styles.achievementTitle}>Rápido y Confiable</Text>
                <Text style={styles.achievementDesc}>95% puntualidad</Text>
              </View>

              <View style={[styles.achievementCard, styles.achievementLocked]}>
                <View style={[styles.achievementIcon, { backgroundColor: COLORS.backgroundDark }]}>
                  <Ionicons name="trophy" size={32} color={COLORS.textLight} />
                </View>
                <Text style={styles.achievementTitle}>Conductor Élite</Text>
                <Text style={styles.achievementDesc}>Completa 50 viajes</Text>
                <View style={styles.lockedBadge}>
                  <Ionicons name="lock-closed" size={12} color={COLORS.textLight} />
                  <Text style={styles.lockedText}>Bloqueado</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bonos */}
          <View style={styles.bonusCard}>
            <View style={styles.bonusHeader}>
              <Ionicons name="gift" size={24} color={COLORS.white} />
              <Text style={styles.bonusTitle}>Bono por Constancia</Text>
            </View>
            <Text style={styles.bonusDesc}>
              Completa 5 viajes esta semana y gana un bono de 10 Bs
            </Text>
            <View style={styles.bonusProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressText}>3/5 viajes</Text>
            </View>
          </View>

          {/* Historial */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historial de Viajes</Text>

            {historialViajes.map((viaje) => (
              <View key={viaje.id} style={styles.historialCard}>
                <View style={styles.historialHeader}>
                  <Text style={styles.historialFecha}>{viaje.fecha}</Text>
                  <Text style={styles.historialGanancia}>+{viaje.ganancia} Bs</Text>
                </View>
                
                <View style={styles.historialRuta}>
                  <Ionicons name="navigate" size={16} color={COLORS.secondary} />
                  <Text style={styles.historialRutaText}>{viaje.ruta}</Text>
                </View>
                
                <View style={styles.historialFooter}>
                  <View style={styles.pasajerosInfo}>
                    <Ionicons name="people" size={16} color={COLORS.textLight} />
                    <Text style={styles.historialPasajeros}>{viaje.pasajeros} pasajeros</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    padding: SPACING.lg,
  },
  earningsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  earningCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    elevation: 2,
    alignItems: 'center',
  },
  earningIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  earningLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  earningValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  estimacionCard: {
    backgroundColor: COLORS.secondary + '10',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.secondary + '30',
  },
  estimacionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  estimacionInfo: {
    flex: 1,
  },
  estimacionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  estimacionSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  estimacionAmount: {
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary + '30',
  },
  estimacionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  estimacionValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  achievementsContainer: {
    gap: SPACING.md,
  },
  achievementCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    elevation: 2,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB80020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  achievementTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  achievementDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.xs,
    backgroundColor: COLORS.backgroundDark,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  lockedText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  bonusCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  bonusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  bonusTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  bonusDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.md,
  },
  bonusProgress: {
    gap: SPACING.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
  },
  progressText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: '600',
  },
  historialCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
  },
  historialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  historialFecha: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  historialGanancia: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  historialRuta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  historialRutaText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  historialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pasajerosInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  historialPasajeros: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
});
