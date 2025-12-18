import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Profile() {
  const [notificacionesActivas, setNotificacionesActivas] = useState(true);
  const [compartirUbicacion, setCompartirUbicacion] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        {/* Header con foto de perfil */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.name}>Juan Pérez</Text>
          <Text style={styles.email}>juan.perez@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color={COLORS.white} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* DATOS PERSONALES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos Personales</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="person-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Nombre Completo</Text>
                    <Text style={styles.menuValue}>Juan Pérez</Text>
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
                  <Ionicons name="mail-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Email</Text>
                    <Text style={styles.menuValue}>juan.perez@example.com</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          {/* MÉTODOS DE PAGO */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Métodos de Pago</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="cash-outline" size={22} color={COLORS.secondary} />
                  <Text style={styles.menuText}>Efectivo</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Predeterminado</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="qr-code-outline" size={22} color={COLORS.secondary} />
                  <Text style={styles.menuText}>Pago QR</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.addPaymentButton}>
                <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
                <Text style={styles.addPaymentText}>Agregar método de pago</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PREFERENCIAS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferencias</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="location-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Viajes Frecuentes</Text>
                    <Text style={styles.menuValueSmall}>Casa → Trabajo</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="time-outline" size={22} color={COLORS.primary} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Horarios Habituales</Text>
                    <Text style={styles.menuValueSmall}>Lun-Vie: 7:30 AM, 6:00 PM</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <View style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.menuText}>Notificaciones</Text>
                </View>
                <Switch
                  value={notificacionesActivas}
                  onValueChange={setNotificacionesActivas}
                  trackColor={{ false: COLORS.backgroundDark, true: COLORS.secondary + '60' }}
                  thumbColor={notificacionesActivas ? COLORS.secondary : COLORS.textLight}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="navigate-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.menuText}>Compartir Ubicación</Text>
                </View>
                <Switch
                  value={compartirUbicacion}
                  onValueChange={setCompartirUbicacion}
                  trackColor={{ false: COLORS.backgroundDark, true: COLORS.secondary + '60' }}
                  thumbColor={compartirUbicacion ? COLORS.secondary : COLORS.textLight}
                />
              </View>
            </View>
          </View>

          {/* SEGURIDAD */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seguridad</Text>
            
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="shield-checkmark-outline" size={22} color={COLORS.danger} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuLabel}>Contacto de Emergencia</Text>
                    <Text style={styles.menuValueSmall}>María Pérez - +591 71234567</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="lock-closed-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.menuText}>Cambiar Contraseña</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="help-circle-outline" size={22} color={COLORS.primary} />
                  <Text style={styles.menuText}>Soporte</Text>
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  content: {
    padding: SPACING.lg,
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
  badge: {
    backgroundColor: COLORS.secondary + '20',
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  addPaymentText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
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
