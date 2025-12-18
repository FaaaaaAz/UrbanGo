import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();
  const [destino, setDestino] = useState('');
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('now');
  const [menuVisible, setMenuVisible] = useState(false);
  const [viajeActivo, setViajeActivo] = useState(true); // Estado de viaje activo
  const [qrModalVisible, setQrModalVisible] = useState(false); // Modal del QR

  const conductoresDisponibles = [
    {
      id: 1,
      nombre: 'Carlos Mendoza',
      calificacion: 4.8,
      ruta: 'Sopocachi → Obrajes',
      puntoRecogida: 'Plaza Abaroa',
      precio: 5,
      tiempoEstimado: '8 min',
      vehiculo: 'Toyota Corolla Blanco',
    },
    {
      id: 2,
      nombre: 'Ana García',
      calificacion: 4.9,
      ruta: 'San Miguel → Zona Sur',
      puntoRecogida: 'Av. Ballivián',
      precio: 6,
      tiempoEstimado: '12 min',
      vehiculo: 'Nissan Sentra Gris',
    },
  ];

  // Si hay viaje activo, mostrar estado del viaje
  if (viajeActivo) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header simplificado */}
          <View style={styles.activeHeader}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.greeting}>Viaje en curso</Text>
              <Text style={styles.subtitle}>Carlos está en camino</Text>
            </View>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setViajeActivo(false)}
            >
              <Ionicons name="close-circle" size={28} color="#FF4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Estado del Viaje - Card Principal */}
            <View style={styles.activeRideCard}>
              {/* Status Banner */}
              <View style={styles.statusBanner}>
                <View style={styles.pulseContainer}>
                  <View style={styles.pulseOuter} />
                  <View style={styles.pulseInner} />
                </View>
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusTitle}>Tu conductor va en camino</Text>
                  <Text style={styles.statusSubtitle}>Llegará en aproximadamente 8 minutos</Text>
                </View>
              </View>

              {/* Información del Conductor */}
              <View style={styles.driverSection}>
                <View style={styles.driverHeader}>
                  <View style={styles.driverAvatar}>
                    <Ionicons name="person" size={32} color={COLORS.primary} />
                  </View>
                  <View style={styles.driverInfo}>
                    <Text style={styles.driverName}>Carlos Mendoza</Text>
                    <View style={styles.driverRating}>
                      <Ionicons name="star" size={16} color="#FFB800" />
                      <Text style={styles.ratingValue}>4.8</Text>
                      <Text style={styles.ratingCount}>(156 viajes)</Text>
                    </View>
                    <Text style={styles.vehicleInfo}>Toyota Corolla Blanco • ABC-123</Text>
                  </View>
                </View>

                {/* Botones de Acción */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => router.push('/(tabs)/messages')}
                  >
                    <Ionicons name="chatbubble" size={20} color={COLORS.white} />
                    <Text style={styles.actionButtonText}>Mensaje</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="call" size={20} color={COLORS.white} />
                    <Text style={styles.actionButtonText}>Llamar</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Detalles del Viaje */}
              <View style={styles.tripDetails}>
                <Text style={styles.tripDetailsTitle}>Detalles del viaje</Text>
                
                {/* Punto de Recogida */}
                <View style={styles.locationItem}>
                  <View style={styles.locationIconContainer}>
                    <View style={styles.greenDot} />
                  </View>
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.locationLabel}>Punto de recogida</Text>
                    <Text style={styles.locationAddress}>Plaza Abaroa</Text>
                  </View>
                </View>

                {/* Línea de conexión */}
                <View style={styles.connectionLine} />

                {/* Destino */}
                <View style={styles.locationItem}>
                  <View style={styles.locationIconContainer}>
                    <Ionicons name="location" size={20} color={COLORS.danger} />
                  </View>
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.locationLabel}>Destino</Text>
                    <Text style={styles.locationAddress}>Obrajes</Text>
                  </View>
                </View>
              </View>

              {/* Información Adicional */}
              <View style={styles.additionalInfo}>
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={20} color={COLORS.primary} />
                  <View>
                    <Text style={styles.infoLabel}>Tiempo estimado</Text>
                    <Text style={styles.infoValue}>15-20 min</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="cash-outline" size={20} color={COLORS.secondary} />
                  <View>
                    <Text style={styles.infoLabel}>Precio acordado</Text>
                    <Text style={styles.infoValue}>5 Bs</Text>
                  </View>
                </View>
              </View>

              {/* Sección de Pago con QR */}
              <View style={styles.paymentSection}>
                <View style={styles.paymentHeader}>
                  <Ionicons name="qr-code" size={24} color={COLORS.primary} />
                  <Text style={styles.paymentTitle}>Opciones de pago</Text>
                </View>
                <Text style={styles.paymentSubtitle}>Paga al finalizar el viaje con efectivo o transferencia QR</Text>
                
                <TouchableOpacity 
                  style={styles.qrButton}
                  onPress={() => setQrModalVisible(true)}
                >
                  <View style={styles.qrButtonContent}>
                    <View style={styles.qrIconContainer}>
                      <Ionicons name="qr-code-outline" size={32} color={COLORS.white} />
                    </View>
                    <View style={styles.qrButtonText}>
                      <Text style={styles.qrButtonTitle}>Ver QR del conductor</Text>
                      <Text style={styles.qrButtonSubtitle}>Escanea para transferir 5 Bs</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
                  </View>
                </TouchableOpacity>

                <View style={styles.paymentMethods}>
                  <View style={styles.paymentMethodItem}>
                    <Ionicons name="card-outline" size={20} color={COLORS.textLight} />
                    <Text style={styles.paymentMethodText}>Transferencia QR</Text>
                  </View>
                  <View style={styles.paymentMethodItem}>
                    <Ionicons name="cash-outline" size={20} color={COLORS.textLight} />
                    <Text style={styles.paymentMethodText}>Efectivo</Text>
                  </View>
                </View>
              </View>

              {/* Botón Ver Mapa */}
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => router.push('/(tabs)/rides')}
              >
                <Ionicons name="map" size={20} color={COLORS.white} />
                <Text style={styles.mapButtonText}>Ver ubicación en tiempo real</Text>
              </TouchableOpacity>
            </View>

            {/* Consejos de Seguridad */}
            <View style={styles.safetyTips}>
              <View style={styles.safetyHeader}>
                <Ionicons name="shield-checkmark" size={24} color={COLORS.secondary} />
                <Text style={styles.safetyTitle}>Consejos de seguridad</Text>
              </View>
              <Text style={styles.safetyText}>• Verifica la placa del vehículo antes de abordar</Text>
              <Text style={styles.safetyText}>• Confirma la identidad del conductor</Text>
              <Text style={styles.safetyText}>• Comparte tu ubicación con un contacto de confianza</Text>
            </View>
          </View>
        </ScrollView>

        {/* Menú Hamburguesa (mismo código) */}
        <Modal
          visible={menuVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
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

        {/* Modal del QR */}
        <Modal
          visible={qrModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setQrModalVisible(false)}
        >
          <View style={styles.qrModalOverlay}>
            <Pressable 
              style={styles.qrModalBackdrop} 
              onPress={() => setQrModalVisible(false)}
            />
            <View style={styles.qrModalWrapper}>
              <View style={styles.qrModalContainer}>
                {/* Header */}
                <View style={styles.qrModalHeader}>
                  <View style={styles.qrModalHeaderContent}>
                    <Text style={styles.qrModalTitle}>Pagar con QR</Text>
                    <Text style={styles.qrModalSubtitle}>Carlos Mendoza</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => setQrModalVisible(false)}
                    style={styles.qrModalClose}
                  >
                    <Ionicons name="close" size={28} color={COLORS.text} />
                  </TouchableOpacity>
                </View>

                {/* Contenido */}
                <ScrollView 
                  style={{ flex: 1 }}
                  contentContainerStyle={styles.qrModalContent}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  {/* QR Code */}
                  <View style={styles.qrImageContainer}>
                    <Image 
                      source={require('../../assets/QR.png')} 
                      style={styles.qrImage}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Instrucciones */}
                  <View style={styles.qrInstructions}>
                    <View style={styles.instructionItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>1</Text>
                      </View>
                      <Text style={styles.instructionText}>Abre tu app bancaria</Text>
                    </View>
                    <View style={styles.instructionItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>2</Text>
                      </View>
                      <Text style={styles.instructionText}>Escanea el código QR</Text>
                    </View>
                    <View style={styles.instructionItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>3</Text>
                      </View>
                      <Text style={styles.instructionText}>Transfiere 5 Bs al conductor</Text>
                    </View>
                  </View>

                  {/* Monto a Pagar */}
                  <View style={styles.qrPriceBox}>
                    <Text style={styles.qrPriceLabel}>Monto a pagar</Text>
                    <Text style={styles.qrPriceValue}>5 Bs</Text>
                  </View>

                  {/* Botón de Confirmación */}
                  <TouchableOpacity 
                    style={styles.confirmPaymentButton}
                    onPress={() => setQrModalVisible(false)}
                  >
                    <Ionicons name="checkmark-circle" size={22} color={COLORS.white} />
                    <Text style={styles.confirmPaymentText}>Listo, ya pagué</Text>
                  </TouchableOpacity>

                  {/* Texto de ayuda */}
                  <Text style={styles.qrFooterText}>
                    También puedes pagar en efectivo directamente al conductor
                  </Text>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // Vista normal cuando NO hay viaje activo
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>¡Hola, Juan!</Text>
            <Text style={styles.subtitle}>¿A dónde vas hoy?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Buscador de Destino */}
          <View style={styles.searchSection}>
            <Text style={styles.searchLabel}>¿A dónde vas?</Text>
            <View style={styles.searchInput}>
              <Ionicons name="search" size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                placeholder="Cerca de... o En dirección a..."
                placeholderTextColor={COLORS.textSecondary}
                value={destino}
                onChangeText={setDestino}
              />
            </View>
          </View>

          {/* Selector de Horario */}
          <View style={styles.timeSelector}>
            <TouchableOpacity 
              style={[styles.timeButton, horarioSeleccionado === 'now' && styles.timeButtonActive]}
              onPress={() => setHorarioSeleccionado('now')}
            >
              <Ionicons 
                name="flash" 
                size={20} 
                color={horarioSeleccionado === 'now' ? COLORS.white : COLORS.secondary} 
              />
              <Text style={[styles.timeButtonText, horarioSeleccionado === 'now' && styles.timeButtonTextActive]}>
                Ahora
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.timeButton, horarioSeleccionado === '15' && styles.timeButtonActive]}
              onPress={() => setHorarioSeleccionado('15')}
            >
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={horarioSeleccionado === '15' ? COLORS.white : COLORS.secondary} 
              />
              <Text style={[styles.timeButtonText, horarioSeleccionado === '15' && styles.timeButtonTextActive]}>
                En 15 min
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.timeButton, horarioSeleccionado === '30' && styles.timeButtonActive]}
              onPress={() => setHorarioSeleccionado('30')}
            >
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={horarioSeleccionado === '30' ? COLORS.white : COLORS.secondary} 
              />
              <Text style={[styles.timeButtonText, horarioSeleccionado === '30' && styles.timeButtonTextActive]}>
                En 30 min
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mapa Preview */}
          <TouchableOpacity style={styles.mapPreview} onPress={() => router.push('/(tabs)/rides')}>
            <View style={styles.mapOverlay}>
              <Ionicons name="map" size={48} color={COLORS.primary} />
              <Text style={styles.mapText}>Ver mapa completo</Text>
              <Text style={styles.mapSubtext}>Conductores activos en tu zona</Text>
            </View>
          </TouchableOpacity>

          {/* Conductores Disponibles */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conductores Disponibles</Text>
            
            {conductoresDisponibles.map((conductor) => (
              <View key={conductor.id} style={styles.conductorCard}>
                <View style={styles.conductorHeader}>
                  <View style={styles.conductorAvatar}>
                    <Ionicons name="person" size={24} color={COLORS.primary} />
                  </View>
                  <View style={styles.conductorInfo}>
                    <Text style={styles.conductorNombre}>{conductor.nombre}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#FFB800" />
                      <Text style={styles.ratingText}>{conductor.calificacion}</Text>
                      <Text style={styles.vehiculoText}>• {conductor.vehiculo}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.rutaInfo}>
                  <Ionicons name="navigate" size={16} color={COLORS.secondary} />
                  <Text style={styles.rutaText}>{conductor.ruta}</Text>
                </View>

                <View style={styles.recogidaInfo}>
                  <Ionicons name="location" size={16} color={COLORS.textLight} />
                  <Text style={styles.recogidaText}>Te recoge en: {conductor.puntoRecogida}</Text>
                </View>

                <View style={styles.conductorFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Precio</Text>
                    <Text style={styles.priceValue}>{conductor.precio} Bs</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
                    <Text style={styles.timeText}>{conductor.tiempoEstimado}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.joinButton}
                    onPress={() => setViajeActivo(true)}
                  >
                    <Text style={styles.joinButtonText}>Unirme</Text>
                  </TouchableOpacity>
                </View>
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
        <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
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
  searchSection: {
    marginBottom: SPACING.lg,
  },
  searchLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  timeSelector: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
    borderWidth: 2,
    borderColor: COLORS.secondary + '30',
  },
  timeButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  timeButtonText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  timeButtonTextActive: {
    color: COLORS.white,
  },
  mapPreview: {
    height: 150,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
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
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  conductorCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
  },
  conductorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  conductorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  conductorInfo: {
    flex: 1,
  },
  conductorNombre: {
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
  vehiculoText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  rutaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
    backgroundColor: COLORS.secondary + '10',
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  rutaText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    fontWeight: '600',
    flex: 1,
  },
  recogidaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  recogidaText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  conductorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundDark,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  priceValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  joinButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
  },
  joinButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  emptySubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  menuOverlay: {
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
  // Estilos para viaje activo
  activeHeader: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeRideCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    elevation: 4,
    marginBottom: SPACING.lg,
  },
  statusBanner: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  pulseContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseOuter: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    opacity: 0.3,
  },
  pulseInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
  driverSection: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  driverHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  driverInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  driverName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  ratingCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  vehicleInfo: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  tripDetails: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  tripDetailsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  greenDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    borderWidth: 3,
    borderColor: COLORS.secondary + '40',
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  connectionLine: {
    width: 2,
    height: 24,
    backgroundColor: COLORS.backgroundDark,
    marginLeft: 15,
    marginVertical: 4,
  },
  additionalInfo: {
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.backgroundLight,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  infoLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    margin: SPACING.lg,
    marginTop: 0,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  mapButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  safetyTips: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    elevation: 2,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  safetyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  safetyText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
    lineHeight: 20,
  },
  // Estilos de la sección de pago
  paymentSection: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
    backgroundColor: COLORS.backgroundLight,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  paymentTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  paymentSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  qrButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 3,
  },
  qrButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  qrIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrButtonText: {
    flex: 1,
  },
  qrButtonTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  qrButtonSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundDark,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  paymentMethodText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  // Estilos del modal del QR
  qrModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  qrModalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  qrModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    maxHeight: '85%',
  },
  qrModalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    height: '100%',
    overflow: 'hidden',
  },
  qrModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
    backgroundColor: COLORS.white,
  },
  qrModalHeaderContent: {
    flex: 1,
  },
  qrModalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  qrModalSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  qrModalClose: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  qrModalContent: {
    padding: SPACING.lg,
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  qrImageContainer: {
    width: 240,
    height: 240,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  qrInstructions: {
    width: '100%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  instructionText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  qrPriceBox: {
    backgroundColor: COLORS.secondary + '20',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  qrPriceLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: 4,
    fontWeight: '500',
  },
  qrPriceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  confirmPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
    width: '100%',
    marginBottom: SPACING.md,
    elevation: 2,
  },
  confirmPaymentText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  qrFooterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
    paddingBottom: SPACING.lg,
  },
});
