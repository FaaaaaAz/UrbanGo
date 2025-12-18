import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// Mock data para viaje actual
const viajeActual = {
  id: 1,
  estado: 'en-camino', // 'esperando', 'en-camino', 'finalizado'
  conductor: {
    nombre: 'Carlos Mendoza',
    calificacion: 4.8,
    telefono: '+591 70123456',
    vehiculo: 'Toyota Corolla Blanco',
    placa: 'ABC-123'
  },
  puntoEncuentro: 'Plaza Abaroa',
  ruta: 'Sopocachi → Obrajes',
  precio: 5,
  horaRecogida: '18:30',
  ubicacionActual: {
    latitude: -16.5050,
    longitude: -68.1193
  },
  destino: {
    latitude: -16.5220,
    longitude: -68.0850
  }
};

// Mock data para otros conductores disponibles
const conductoresDisponibles = [
  {
    id: 2,
    nombre: 'María López',
    calificacion: 4.9,
    vehiculo: 'Honda Civic Gris',
    ubicacion: {
      latitude: -16.4980,
      longitude: -68.1250
    }
  },
  {
    id: 3,
    nombre: 'Jose Luis',
    calificacion: 4.7,
    vehiculo: 'Nissan Sentra Azul',
    ubicacion: {
      latitude: -16.5100,
      longitude: -68.1100
    }
  },
  {
    id: 4,
    nombre: 'Ana Torres',
    calificacion: 4.8,
    vehiculo: 'Mazda 3 Rojo',
    ubicacion: {
      latitude: -16.5000,
      longitude: -68.1300
    }
  }
];

// Ruta simulada de Carlos Mendoza (línea entre su ubicación y destino)
const rutaCarlosMendoza = [
  { latitude: -16.5050, longitude: -68.1193 },
  { latitude: -16.5080, longitude: -68.1150 },
  { latitude: -16.5120, longitude: -68.1100 },
  { latitude: -16.5160, longitude: -68.1020 },
  { latitude: -16.5190, longitude: -68.0950 },
  { latitude: -16.5220, longitude: -68.0850 }
];

// Mi ubicación actual (pasajero)
const miUbicacion = {
  latitude: -16.5070,
  longitude: -68.1180
};

// Mock data para historial
const historialViajes = [
  {
    id: 1,
    fecha: '2025-12-15',
    ruta: 'Sopocachi → Obrajes',
    precio: 5,
    conductor: 'Carlos Mendoza',
    calificacion: null
  },
  {
    id: 2,
    fecha: '2025-12-10',
    ruta: 'Centro → Calacoto',
    precio: 6,
    conductor: 'María López',
    calificacion: 5
  }
];

export default function Rides() {
  const [modalActivo, setModalActivo] = useState<'viaje' | 'historial' | null>(null);
  const [viajeACalificar, setViajeACalificar] = useState<any>(null);
  const [mostrarRuta, setMostrarRuta] = useState(false);

  const handleMarkerPress = () => {
    if (!mostrarRuta) {
      setMostrarRuta(true);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'esperando': return COLORS.warning;
      case 'en-camino': return COLORS.secondary;
      case 'finalizado': return COLORS.textLight;
      default: return COLORS.textLight;
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'esperando': return 'Esperando conductor';
      case 'en-camino': return 'En camino';
      case 'finalizado': return 'Finalizado';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* Mapa de fondo */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -16.5050,
            longitude: -68.1193,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Mi ubicación (pasajero) */}
          <Marker
            coordinate={miUbicacion}
            title="Mi ubicación"
            description="Estás aquí"
          >
            <View style={styles.miUbicacionMarker}>
              <View style={styles.miUbicacionDot} />
              <View style={styles.miUbicacionPulse} />
            </View>
          </Marker>

          {/* Marcador del viaje actual - Carlos Mendoza */}
          <Marker
            coordinate={viajeActual.ubicacionActual}
            title={viajeActual.conductor.nombre}
            description={viajeActual.conductor.vehiculo}
            onPress={handleMarkerPress}
          >
            <View style={styles.markerContainer}>
              <Ionicons name="car" size={24} color={COLORS.secondary} />
            </View>
          </Marker>

          {/* Destino de Carlos Mendoza */}
          {mostrarRuta && (
            <Marker
              coordinate={viajeActual.destino}
              title="Destino"
              description="Obrajes"
            >
              <View style={styles.destinoMarker}>
                <Ionicons name="flag" size={20} color={COLORS.danger} />
              </View>
            </Marker>
          )}

          {/* Ruta de Carlos Mendoza */}
          {mostrarRuta && (
            <Polyline
              coordinates={rutaCarlosMendoza}
              strokeColor="#00D9FF"
              strokeWidth={5}
              lineDashPattern={[1, 10]}
            />
          )}

          {/* Otros conductores disponibles */}
          {conductoresDisponibles.map((conductor) => (
            <Marker
              key={conductor.id}
              coordinate={conductor.ubicacion}
              title={conductor.nombre}
              description={conductor.vehiculo}
            >
              <View style={[styles.markerContainer, styles.otherDriverMarker]}>
                <Ionicons name="car" size={20} color={COLORS.primary} />
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Botones flotantes sobre el mapa */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity
            style={[styles.floatingButton, styles.buttonViaje]}
            onPress={() => setModalActivo('viaje')}
          >
            <Ionicons name="car" size={20} color={COLORS.white} />
            <Text style={styles.floatingButtonText}>Viaje Actual</Text>
            <View style={[styles.badge, { backgroundColor: getEstadoColor(viajeActual.estado) }]}>
              <Text style={styles.badgeText}>{getEstadoTexto(viajeActual.estado)}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.floatingButton, styles.buttonHistorial]}
            onPress={() => setModalActivo('historial')}
          >
            <Ionicons name="time" size={20} color={COLORS.white} />
            <Text style={styles.floatingButtonText}>Historial</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Viaje Actual */}
        <Modal
          visible={modalActivo === 'viaje'}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalActivo(null)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setModalActivo(null)}>
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Viaje Actual</Text>
                <TouchableOpacity onPress={() => setModalActivo(null)}>
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {/* Estado del viaje */}
                <View style={[styles.statusBadge, { backgroundColor: getEstadoColor(viajeActual.estado) + '20' }]}>
                  <Ionicons name="information-circle" size={20} color={getEstadoColor(viajeActual.estado)} />
                  <Text style={[styles.statusText, { color: getEstadoColor(viajeActual.estado) }]}>
                    {getEstadoTexto(viajeActual.estado)}
                  </Text>
                </View>

                {/* Datos del conductor */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Conductor</Text>
                  <View style={styles.conductorCard}>
                    <View style={styles.avatarCircle}>
                      <Ionicons name="person" size={24} color={COLORS.primary} />
                    </View>
                    <View style={styles.conductorDetails}>
                      <Text style={styles.conductorNombre}>{viajeActual.conductor.nombre}</Text>
                      <View style={styles.ratingRow}>
                        <Ionicons name="star" size={14} color="#FFB800" />
                        <Text style={styles.ratingText}>{viajeActual.conductor.calificacion}</Text>
                      </View>
                      <Text style={styles.vehiculoInfo}>{viajeActual.conductor.vehiculo}</Text>
                      <Text style={styles.placaInfo}>Placa: {viajeActual.conductor.placa}</Text>
                    </View>
                    <TouchableOpacity style={styles.callButton}>
                      <Ionicons name="call" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Punto de encuentro */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Punto de Encuentro</Text>
                  <View style={styles.infoCard}>
                    <Ionicons name="location" size={20} color={COLORS.secondary} />
                    <Text style={styles.infoText}>{viajeActual.puntoEncuentro}</Text>
                  </View>
                  <View style={styles.infoCard}>
                    <Ionicons name="time" size={20} color={COLORS.secondary} />
                    <Text style={styles.infoText}>Hora: {viajeActual.horaRecogida}</Text>
                  </View>
                </View>

                {/* Ruta */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Ruta</Text>
                  <View style={styles.rutaCard}>
                    <Ionicons name="navigate" size={20} color={COLORS.primary} />
                    <Text style={styles.rutaText}>{viajeActual.ruta}</Text>
                  </View>
                </View>

                {/* Precio */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Precio</Text>
                  <Text style={styles.priceDisplay}>{viajeActual.precio} Bs</Text>
                </View>

                {/* Botón Cancelar */}
                <TouchableOpacity style={styles.cancelButton}>
                  <Ionicons name="close-circle" size={20} color={COLORS.white} />
                  <Text style={styles.cancelButtonText}>Cancelar Viaje</Text>
                </TouchableOpacity>
              </ScrollView>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Modal Historial */}
        <Modal
          visible={modalActivo === 'historial'}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalActivo(null)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setModalActivo(null)}>
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Historial de Viajes</Text>
                <TouchableOpacity onPress={() => setModalActivo(null)}>
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {historialViajes.map((viaje) => (
                  <View key={viaje.id} style={styles.historialCard}>
                    <View style={styles.historialHeader}>
                      <Text style={styles.historialFecha}>{viaje.fecha}</Text>
                      <Text style={styles.historialPrecio}>{viaje.precio} Bs</Text>
                    </View>
                    
                    <View style={styles.historialRuta}>
                      <Ionicons name="navigate" size={16} color={COLORS.secondary} />
                      <Text style={styles.historialRutaText}>{viaje.ruta}</Text>
                    </View>
                    
                    <View style={styles.historialFooter}>
                      <View style={styles.conductorInfo}>
                        <Ionicons name="person" size={16} color={COLORS.textLight} />
                        <Text style={styles.historialConductor}>{viaje.conductor}</Text>
                      </View>
                      
                      {viaje.calificacion ? (
                        <View style={styles.ratingDisplay}>
                          <Ionicons name="star" size={16} color="#FFB800" />
                          <Text style={styles.ratingValue}>{viaje.calificacion}</Text>
                        </View>
                      ) : (
                        <TouchableOpacity 
                          style={styles.rateButton}
                          onPress={() => setViajeACalificar(viaje)}
                        >
                          <Text style={styles.rateButtonText}>Calificar</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Modal para calificar */}
        <Modal
          visible={viajeACalificar !== null}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setViajeACalificar(null)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setViajeACalificar(null)}>
            <Pressable style={styles.ratingModal} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.ratingModalTitle}>Calificar Experiencia</Text>
              <Text style={styles.ratingModalSubtitle}>{viajeACalificar?.conductor}</Text>
              
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} style={styles.starButton}>
                    <Ionicons name="star-outline" size={40} color="#FFB800" />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.submitRatingButton}
                onPress={() => setViajeACalificar(null)}
              >
                <Text style={styles.submitRatingText}>Enviar Calificación</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
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
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  floatingButtons: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    gap: SPACING.sm,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
    elevation: 4,
  },
  buttonViaje: {
    backgroundColor: COLORS.primary,
  },
  buttonHistorial: {
    backgroundColor: COLORS.secondary,
  },
  floatingButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
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
    elevation: 8,
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statusText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  conductorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conductorDetails: {
    flex: 1,
  },
  conductorNombre: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  vehiculoInfo: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  placaInfo: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  rutaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary + '10',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  rutaText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  priceDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.danger,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  historialCard: {
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
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
  historialPrecio: {
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
  conductorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  historialConductor: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  rateButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  rateButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  ratingModal: {
    backgroundColor: COLORS.white,
    margin: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
  },
  ratingModalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  ratingModalSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  starButton: {
    padding: SPACING.xs,
  },
  submitRatingButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    width: '100%',
  },
  submitRatingText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Estilos para mi ubicación
  miUbicacionMarker: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miUbicacionDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.secondary,
    borderWidth: 4,
    borderColor: COLORS.white,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  miUbicacionPulse: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    opacity: 0.4,
    zIndex: 1,
  },
  // Estilos para destino
  destinoMarker: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.danger,
  },
  // Estilos para otros conductores
  otherDriverMarker: {
    width: 36,
    height: 36,
    borderColor: COLORS.primary,
    opacity: 0.8,
  },
});
