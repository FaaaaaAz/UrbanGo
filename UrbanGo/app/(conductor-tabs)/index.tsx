import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';

// Mock data para solicitudes
const solicitudesEntrantes = [
  {
    id: 1,
    pasajero: {
      nombre: 'María López',
      foto: null,
      calificacion: 4.9,
    },
    puntoRecogida: 'Av. Arce esquina',
    desvio: 3,
    precio: 5,
  },
  {
    id: 2,
    pasajero: {
      nombre: 'Juan Pérez',
      foto: null,
      calificacion: 4.7,
    },
    puntoRecogida: 'Plaza Abaroa',
    desvio: 5,
    precio: 5,
  },
];

export default function ConductorRuta() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalPublicar, setModalPublicar] = useState(false);
  const [rutaPublicada, setRutaPublicada] = useState(false);
  
  // Form states
  const [puntoInicio, setPuntoInicio] = useState('');
  const [direccionGeneral, setDireccionGeneral] = useState('');
  const [horario, setHorario] = useState('');
  const [cupos, setCupos] = useState('2');

  const handlePublicarRuta = () => {
    setRutaPublicada(true);
    setModalPublicar(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>¡Hola, Conductor!</Text>
            <Text style={styles.subtitle}>Gestiona tu ruta diaria</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Botón Publicar Ruta */}
          {!rutaPublicada ? (
            <TouchableOpacity 
              style={styles.publishButton}
              onPress={() => setModalPublicar(true)}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.white} />
              <Text style={styles.publishButtonText}>Publicar Ruta de Hoy</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.rutaActiva}>
              <View style={styles.rutaActivaHeader}>
                <View>
                  <Text style={styles.rutaActivaTitle}>Ruta Activa</Text>
                  <Text style={styles.rutaActivaSubtitle}>Sopocachi → Obrajes</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>En curso</Text>
                </View>
              </View>

              <View style={styles.rutaDetails}>
                <View style={styles.rutaDetailItem}>
                  <Ionicons name="location" size={18} color={COLORS.primary} />
                  <Text style={styles.rutaDetailText}>Inicio: Plaza Abaroa</Text>
                </View>
                <View style={styles.rutaDetailItem}>
                  <Ionicons name="time" size={18} color={COLORS.primary} />
                  <Text style={styles.rutaDetailText}>Horario: 18:00</Text>
                </View>
                <View style={styles.rutaDetailItem}>
                  <Ionicons name="people" size={18} color={COLORS.primary} />
                  <Text style={styles.rutaDetailText}>Cupos: 2 disponibles</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.editRutaButton}>
                <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                <Text style={styles.editRutaText}>Editar Ruta</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Mapa de la Ruta */}
          <View style={styles.mapSection}>
            <Text style={styles.sectionTitle}>Mapa de tu Ruta</Text>
            <TouchableOpacity style={styles.mapPreview}>
              <View style={styles.mapOverlay}>
                <Ionicons name="map" size={48} color={COLORS.primary} />
                <Text style={styles.mapText}>Vista de tu ruta</Text>
                <Text style={styles.mapSubtext}>Toca para ver en detalle</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Solicitudes Entrantes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Solicitudes Entrantes</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{solicitudesEntrantes.length}</Text>
              </View>
            </View>

            {solicitudesEntrantes.map((solicitud) => (
              <View key={solicitud.id} style={styles.solicitudCard}>
                <View style={styles.solicitudHeader}>
                  <View style={styles.pasajeroAvatar}>
                    <Ionicons name="person" size={24} color={COLORS.primary} />
                  </View>
                  <View style={styles.pasajeroInfo}>
                    <Text style={styles.pasajeroNombre}>{solicitud.pasajero.nombre}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color="#FFB800" />
                      <Text style={styles.ratingText}>{solicitud.pasajero.calificacion}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.solicitudDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="location" size={16} color={COLORS.textLight} />
                    <Text style={styles.detailText}>{solicitud.puntoRecogida}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time" size={16} color={COLORS.warning} />
                    <Text style={styles.desvioText}>+{solicitud.desvio} min de desvío</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="cash" size={16} color={COLORS.secondary} />
                    <Text style={styles.precioText}>{solicitud.precio} Bs</Text>
                  </View>
                </View>

                <View style={styles.solicitudActions}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Ionicons name="close-circle" size={20} color={COLORS.danger} />
                    <Text style={styles.rejectButtonText}>Rechazar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
                    <Text style={styles.acceptButtonText}>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal Publicar Ruta */}
      <Modal
        visible={modalPublicar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalPublicar(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalPublicar(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Publicar Ruta</Text>
              <TouchableOpacity onPress={() => setModalPublicar(false)}>
                <Ionicons name="close" size={28} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Punto de Inicio</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="location" size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Plaza Abaroa"
                    value={puntoInicio}
                    onChangeText={setPuntoInicio}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Dirección General</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="navigate" size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Sopocachi → Obrajes"
                    value={direccionGeneral}
                    onChangeText={setDireccionGeneral}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Horario</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="time" size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: 18:00"
                    value={horario}
                    onChangeText={setHorario}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Cupos Disponibles (1-3)</Text>
                <View style={styles.cuposContainer}>
                  {['1', '2', '3'].map((num) => (
                    <TouchableOpacity
                      key={num}
                      style={[styles.cupoButton, cupos === num && styles.cupoButtonActive]}
                      onPress={() => setCupos(num)}
                    >
                      <Text style={[styles.cupoButtonText, cupos === num && styles.cupoButtonTextActive]}>
                        {num}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handlePublicarRuta}
              >
                <Text style={styles.submitButtonText}>Publicar Ruta</Text>
              </TouchableOpacity>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Menú Hamburguesa */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.menuOverlayStyle} onPress={() => setMenuVisible(false)}>
          <Pressable style={styles.menuContainer} onPress={(e) => e.stopPropagation()}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menú</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={28} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.menuContent}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                }}
              >
                <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Ajustes</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                }}
              >
                <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>Acerca de</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  router.replace('/onboarding');
                }}
              >
                <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
                <Text style={[styles.menuItemText, { color: COLORS.danger }]}>Cerrar Sesión</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>

            <View style={styles.menuFooter}>
              <Text style={styles.menuFooterText}>UrbanGo v1.0.0</Text>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingBottom: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: SPACING.md,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    opacity: 0.9,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.lg,
  },
  publishButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    elevation: 4,
  },
  publishButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  rutaActiva: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    elevation: 2,
  },
  rutaActivaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  rutaActivaTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  rutaActivaSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: COLORS.secondary + '20',
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  statusBadgeText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  rutaDetails: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  rutaDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  rutaDetailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  editRutaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundDark,
    paddingTop: SPACING.md,
  },
  editRutaText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  mapSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  mapPreview: {
    height: 150,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary + '30',
  },
  mapOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
  },
  mapText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  mapSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  badge: {
    backgroundColor: COLORS.danger,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  solicitudCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
  },
  solicitudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  pasajeroAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  pasajeroInfo: {
    flex: 1,
  },
  pasajeroNombre: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  solicitudDetails: {
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  desvioText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.warning,
    fontWeight: '600',
  },
  precioText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  solicitudActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundDark,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.danger,
    gap: SPACING.xs,
  },
  rejectButtonText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.secondary,
    gap: SPACING.xs,
  },
  acceptButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalBody: {
    padding: SPACING.lg,
  },
  formGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  cuposContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cupoButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.backgroundDark,
    alignItems: 'center',
  },
  cupoButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  cupoButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  cupoButtonTextActive: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  menuOverlayStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingBottom: SPACING.xl,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  menuContent: {
    padding: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.backgroundDark,
    marginVertical: SPACING.xs,
  },
  menuFooter: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
  },
  menuFooterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
});
