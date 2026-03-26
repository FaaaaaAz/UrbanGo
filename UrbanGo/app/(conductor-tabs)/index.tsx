import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';

// Mock data para evaluaciones
const evaluaciones = [
  {
    id: 1,
    estrellas: 5,
    comentario: 'Fue muy amable y puntual',
    fecha: '2026-03-10',
  },
  {
    id: 2,
    estrellas: 4,
    comentario: 'Buen servicio',
    fecha: '2026-03-09',
  },
  {
    id: 3,
    estrellas: 5,
    comentario: 'Excelente conductor, muy profesional',
    fecha: '2026-03-08',
  },
  {
    id: 4,
    estrellas: 4,
    comentario: null,
    fecha: '2026-03-07',
  },
];

// Función para determinar el rango según puntaje
const obtenerRango = (puntaje: number) => {
  if (puntaje >= 90) return { nombre: 'Elite', color: '#FFD700', icono: 'trophy' };
  if (puntaje >= 70) return { nombre: 'Oro', color: '#FFA500', icono: 'medal' };
  if (puntaje >= 50) return { nombre: 'Plata', color: '#C0C0C0', icono: 'ribbon' };
  return { nombre: 'Riesgo', color: '#DC2626', icono: 'warning' };
};

export default function ConductorInicio() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [rutaPublicada, setRutaPublicada] = useState(false);
  
  // Datos del conductor
  const puntajeConductor = 85;
  const promedioCalificacion = 4.8;
  const cancelacionesSemana = 3;
  const rango = obtenerRango(puntajeConductor);

  // Solicitudes entrantes
  const solicitudesEntrantes = [
    {
      id: 1,
      pasajero: 'María López',
      puntoRecogida: 'Av. Arce esquina',
      calificacion: 4.9,
    },
  ];

  const renderEstrellas = (cantidad: number) => {
    const estrellas = [];
    for (let i = 0; i < 5; i++) {
      estrellas.push(
        <Ionicons
          key={i}
          name={i < cantidad ? 'star' : 'star-outline'}
          size={18}
          color="#FFB800"
        />
      );
    }
    return estrellas;
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
            <Text style={styles.greeting}>Inicio</Text>
            <Text style={styles.subtitle}>Panel del Conductor</Text>
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
              onPress={() => setRutaPublicada(true)}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.white} />
              <Text style={styles.publishButtonText}>Publicar Ruta de Hoy</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.rutaActiva}>
              <View style={styles.rutaActivaHeader}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.secondary} />
                <Text style={styles.rutaActivaText}>Ruta publicada hoy</Text>
              </View>
            </View>
          )}

          {/* Solicitud Entrante */}
          {solicitudesEntrantes.length > 0 && (
            <View style={styles.solicitudEntrante}>
              <View style={styles.solicitudHeader}>
                <View style={styles.solicitudIconContainer}>
                  <Ionicons name="notifications" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.solicitudTitle}>Solicitud entrante</Text>
              </View>

              <View style={styles.solicitudBody}>
                <View style={styles.pasajeroRow}>
                  <View style={styles.pasajeroAvatar}>
                    <Ionicons name="person" size={20} color={COLORS.primary} />
                  </View>
                  <View style={styles.pasajeroData}>
                    <Text style={styles.pasajeroNombre}>{solicitudesEntrantes[0].pasajero}</Text>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={12} color="#FFB800" />
                      <Text style={styles.ratingText}>{solicitudesEntrantes[0].calificacion}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.puntoRecogida}>
                  <Ionicons name="location" size={16} color={COLORS.textLight} />
                  <Text style={styles.puntoRecogidaText}>{solicitudesEntrantes[0].puntoRecogida}</Text>
                </View>

                <View style={styles.solicitudActions}>
                  <TouchableOpacity style={styles.rechazarButton}>
                    <Ionicons name="close" size={18} color={COLORS.error} />
                    <Text style={styles.rechazarButtonText}>Rechazar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.aceptarButton}>
                    <Ionicons name="checkmark" size={18} color={COLORS.white} />
                    <Text style={styles.aceptarButtonText}>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Puntaje y Rango en una fila */}
          <View style={styles.puntajeRangoRow}>
            {/* Puntaje del Conductor */}
            <View style={styles.puntajeCard}>
              <View style={styles.cardHeaderSmall}>
                <Ionicons name="analytics" size={20} color={COLORS.primary} />
                <Text style={styles.cardTitleSmall}>Puntaje del conductor</Text>
              </View>
              
              <View style={styles.puntajeDisplaySmall}>
                <Text style={styles.puntajeNumeroSmall}>{puntajeConductor}</Text>
                <Text style={styles.puntajeTotalSmall}>/100</Text>
              </View>

              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${puntajeConductor}%` }]} />
                </View>
                <Text style={styles.progressText}>{puntajeConductor}%</Text>
              </View>
            </View>

            {/* Rango del Conductor */}
            <View style={styles.rangoCard}>
              <View style={styles.cardHeaderSmall}>
                <Ionicons name="shield-checkmark" size={20} color={rango.color} />
                <Text style={styles.cardTitleSmall}>Rango actual</Text>
              </View>

              <View style={styles.rangoDisplaySmall}>
                <View style={[styles.rangoIconContainerSmall, { backgroundColor: rango.color + '20' }]}>
                  <Ionicons name={rango.icono as any} size={32} color={rango.color} />
                </View>
                <Text style={[styles.rangoNombreSmall, { color: rango.color }]}>{rango.nombre}</Text>
              </View>
            </View>
          </View>

          {/* Promedio de Calificaciones */}
          <View style={styles.calificacionCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderIcon}>
                <Ionicons name="star" size={24} color="#FFB800" />
              </View>
              <Text style={styles.cardTitle}>Calificación promedio</Text>
            </View>

            <View style={styles.calificacionDisplay}>
              <View style={styles.estrellasGrandes}>
                {renderEstrellas(Math.round(promedioCalificacion))}
              </View>
              <Text style={styles.calificacionNumero}>
                {promedioCalificacion.toFixed(1)} / 5
              </Text>
            </View>
          </View>

          {/* Advertencias o Sanciones */}
          {cancelacionesSemana >= 3 && (
            <View style={styles.advertenciaCard}>
              <View style={styles.advertenciaHeader}>
                <View style={styles.advertenciaIconContainer}>
                  <Ionicons name="alert-circle" size={32} color={COLORS.error} />
                </View>
                <Text style={styles.advertenciaTitle}>Advertencia</Text>
              </View>
              
              <Text style={styles.advertenciaText}>
                Has cancelado {cancelacionesSemana} viajes esta semana.
              </Text>
              <Text style={styles.advertenciaSubtext}>
                Evita cancelaciones para mantener tu prioridad y puntaje.
              </Text>
            </View>
          )}

          {/* Historial de Evaluaciones */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="chatbox-ellipses" size={24} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Historial de evaluaciones</Text>
            </View>

            {evaluaciones.map((evaluacion) => (
              <View key={evaluacion.id} style={styles.evaluacionCard}>
                <View style={styles.evaluacionHeader}>
                  <View style={styles.estrellas}>
                    {renderEstrellas(evaluacion.estrellas)}
                  </View>
                  <Text style={styles.evaluacionFecha}>{evaluacion.fecha}</Text>
                </View>

                {evaluacion.comentario && (
                  <View style={styles.comentarioContainer}>
                    <Ionicons name="chatbubble-outline" size={16} color={COLORS.textLight} />
                    <Text style={styles.comentarioText}>"{evaluacion.comentario}"</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

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
                  router.push('/ajustes');
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
                  router.push('/acerca-de');
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

  // Estilos para Publicar Ruta
  publishButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  publishButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  rutaActiva: {
    backgroundColor: COLORS.secondary + '15',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.secondary + '40',
  },
  rutaActivaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    justifyContent: 'center',
  },
  rutaActivaText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.secondary,
  },

  // Estilos para Solicitud Entrante
  solicitudEntrante: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  solicitudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  solicitudIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  solicitudTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  solicitudBody: {
    gap: SPACING.sm,
  },
  pasajeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  pasajeroAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pasajeroData: {
    flex: 1,
  },
  pasajeroNombre: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
    fontWeight: '600',
  },
  puntoRecogida: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  puntoRecogidaText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  solicitudActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  rechazarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.error,
    gap: SPACING.xs,
  },
  rechazarButtonText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  aceptarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    gap: SPACING.xs,
  },
  aceptarButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },

  // Estilos para Puntaje y Rango en fila
  puntajeRangoRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },

  // Estilos para Puntaje del Conductor (versión pequeña)
  puntajeCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    elevation: 2,
  },
  cardHeaderSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  cardTitleSmall: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.textLight,
    flex: 1,
  },
  puntajeDisplaySmall: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  puntajeNumeroSmall: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  puntajeTotalSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  progressBarContainer: {
    gap: SPACING.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
  },
  progressText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    textAlign: 'right',
    fontWeight: '600',
  },

  // Estilos para Rango del Conductor (versión pequeña)
  rangoCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    elevation: 2,
  },
  rangoDisplaySmall: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  rangoIconContainerSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  rangoNombreSmall: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },

  // Estilos para Calificación
  calificacionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  cardHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  calificacionDisplay: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  estrellasGrandes: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  calificacionNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // Estilos para Advertencia
  advertenciaCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  advertenciaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  advertenciaIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  advertenciaTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  advertenciaText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  advertenciaSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    lineHeight: 20,
  },

  // Estilos para Historial de Evaluaciones
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  evaluacionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
  },
  evaluacionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  estrellas: {
    flexDirection: 'row',
    gap: 4,
  },
  evaluacionFecha: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  comentarioContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.sm,
  },
  comentarioText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // Estilos para Menú
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
  menuTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
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
