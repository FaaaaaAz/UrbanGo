import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>¡Hola, Usuario!</Text>
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
                  <TouchableOpacity style={styles.joinButton}>
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
});
