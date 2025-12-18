import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ConductorProfile() {
  const [disponibilidadActiva, setDisponibilidadActiva] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.name}>Carlos Mendoza</Text>
          <Text style={styles.email}>carlos.mendoza@example.com</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <Text style={styles.ratingValue}>4.8</Text>
            <Text style={styles.ratingLabel}>Calificación</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Disponibilidad Toggle */}
          <View style={styles.availabilityCard}>
            <View style={styles.availabilityLeft}>
              <Ionicons 
                name={disponibilidadActiva ? "checkmark-circle" : "close-circle"} 
                size={32} 
                color={disponibilidadActiva ? COLORS.secondary : COLORS.textLight} 
              />
              <View style={styles.availabilityInfo}>
                <Text style={styles.availabilityTitle}>Disponibilidad</Text>
                <Text style={styles.availabilitySubtitle}>
                  {disponibilidadActiva ? 'Estás visible para pasajeros' : 'No estás aceptando viajes'}
                </Text>
              </View>
            </View>
            <Switch
              value={disponibilidadActiva}
              onValueChange={setDisponibilidadActiva}
              trackColor={{ false: COLORS.backgroundDark, true: COLORS.secondary + '60' }}
              thumbColor={disponibilidadActiva ? COLORS.secondary : COLORS.textLight}
            />
          </View>

          {/* DATOS PERSONALES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos Personales</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="person-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Nombre Completo</Text>
                    <Text style={styles.menuValue}>Carlos Mendoza</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="call-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Teléfono</Text>
                    <Text style={styles.menuValue}>+591 70123456</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="card-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Licencia de Conducir</Text>
                    <Text style={styles.menuValue}>LP-123456789</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          {/* DATOS DEL VEHÍCULO */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos del Vehículo</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="car-outline" size={22} color={COLORS.secondary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Modelo</Text>
                    <Text style={styles.menuValue}>Toyota Corolla 2020</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="pricetag-outline" size={22} color={COLORS.secondary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Placa</Text>
                    <Text style={styles.menuValue}>ABC-123</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="color-palette-outline" size={22} color={COLORS.secondary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Color</Text>
                    <Text style={styles.menuValue}>Blanco</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="people-outline" size={22} color={COLORS.secondary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Capacidad</Text>
                    <Text style={styles.menuValue}>3 pasajeros</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          {/* HORARIOS HABITUALES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horarios Habituales</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="time-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Días Activos</Text>
                    <Text style={styles.menuValueSmall}>Lun - Vie</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="sunny-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Horario Mañana</Text>
                    <Text style={styles.menuValueSmall}>7:30 AM - 8:30 AM</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="moon-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Horario Tarde</Text>
                    <Text style={styles.menuValueSmall}>6:00 PM - 7:00 PM</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          {/* CALIFICACIONES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Calificaciones Recibidas</Text>
            
            <View style={styles.ratingsCard}>
              <View style={styles.ratingsOverview}>
                <View style={styles.ratingsBig}>
                  <Text style={styles.ratingsNumber}>4.8</Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={20} color="#FFB800" />
                    ))}
                  </View>
                  <Text style={styles.ratingsCount}>Basado en 24 calificaciones</Text>
                </View>
              </View>

              <View style={styles.ratingsBreakdown}>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>5 ⭐</Text>
                  <View style={styles.ratingBarBg}>
                    <View style={[styles.ratingBarFill, { width: '75%' }]} />
                  </View>
                  <Text style={styles.ratingPercent}>75%</Text>
                </View>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>4 ⭐</Text>
                  <View style={styles.ratingBarBg}>
                    <View style={[styles.ratingBarFill, { width: '20%' }]} />
                  </View>
                  <Text style={styles.ratingPercent}>20%</Text>
                </View>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>3 ⭐</Text>
                  <View style={styles.ratingBarBg}>
                    <View style={[styles.ratingBarFill, { width: '5%' }]} />
                  </View>
                  <Text style={styles.ratingPercent}>5%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* SOPORTE */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Soporte</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="help-circle-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.menuText}>Centro de Ayuda</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="document-text-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.menuText}>Términos y Condiciones</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Versión MVP</Text>
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
    padding: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
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
    marginBottom: SPACING.md,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  ratingValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  ratingLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
  },
  content: {
    padding: SPACING.lg,
  },
  availabilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    elevation: 2,
  },
  availabilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  availabilityInfo: {
    flex: 1,
  },
  availabilityTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  availabilitySubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  menuItemText: {
    flex: 1,
  },
  menuLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  menuValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  menuValueSmall: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  menuText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.backgroundDark,
    marginLeft: SPACING.md + 22 + SPACING.sm,
  },
  ratingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    elevation: 2,
  },
  ratingsOverview: {
    alignItems: 'center',
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
    marginBottom: SPACING.md,
  },
  ratingsBig: {
    alignItems: 'center',
  },
  ratingsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: SPACING.xs,
  },
  ratingsCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  ratingsBreakdown: {
    gap: SPACING.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  ratingLabel: {
    width: 40,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  ratingBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFB800',
    borderRadius: RADIUS.sm,
  },
  ratingPercent: {
    width: 40,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'right',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
});
