import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../config/constants';
import { Ionicons } from '@expo/vector-icons';

export default function AcercaDe() {
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acerca de UrbanGo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Logo y Versión */}
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/LogoUrban.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.version}>Versión 1.0.0</Text>
          <Text style={styles.tagline}>Movilidad compartida para Bolivia</Text>
        </View>

        {/* Misión */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="rocket-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Nuestra Misión</Text>
          </View>
          <Text style={styles.sectionText}>
            Transformar la movilidad urbana en Bolivia conectando personas que comparten rutas diarias, 
            ofreciendo una alternativa económica, segura y eficiente al transporte tradicional.
          </Text>
        </View>

        {/* Visión */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="telescope-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Nuestra Visión</Text>
          </View>
          <Text style={styles.sectionText}>
            Ser la plataforma líder de movilidad compartida en Bolivia, reduciendo el tráfico vehicular 
            y democratizando el acceso al transporte seguro y económico en las principales ciudades del país.
          </Text>
        </View>

        {/* Valores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Nuestros Valores</Text>
          </View>
          <View style={styles.valuesList}>
            <View style={styles.valueItem}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.secondary} />
              <Text style={styles.valueText}>Seguridad en cada viaje</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="people" size={20} color={COLORS.secondary} />
              <Text style={styles.valueText}>Comunidad colaborativa</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="leaf" size={20} color={COLORS.secondary} />
              <Text style={styles.valueText}>Sostenibilidad ambiental</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="cash" size={20} color={COLORS.secondary} />
              <Text style={styles.valueText}>Economía accesible</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="flash" size={20} color={COLORS.secondary} />
              <Text style={styles.valueText}>Innovación constante</Text>
            </View>
          </View>
        </View>

        {/* Equipo */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Nuestro Equipo</Text>
          </View>
          <Text style={styles.teamIntro}>
            UrbanGo es creado por un equipo multidisciplinario de profesionales bolivianos 
            comprometidos con mejorar la movilidad urbana:
          </Text>

          <View style={styles.teamGrid}>
            <View style={styles.teamMember}>
              <View style={[styles.avatar, { backgroundColor: COLORS.primary + '20' }]}>
                <Ionicons name="person" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.memberName}>Fabian Azeñas</Text>
              <Text style={styles.memberRole}>Ingeniero de Sistemas</Text>
              <Text style={styles.memberDescription}>Desarrollo & Arquitectura</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={[styles.avatar, { backgroundColor: COLORS.primary + '20' }]}>
                <Ionicons name="person" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.memberName}>Camilo Zuleta</Text>
              <Text style={styles.memberRole}>Ingeniero de Sistemas</Text>
              <Text style={styles.memberDescription}>Backend & Infraestructura</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={[styles.avatar, { backgroundColor: COLORS.primary + '20' }]}>
                <Ionicons name="person" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.memberName}>Adrian Coello</Text>
              <Text style={styles.memberRole}>Ingeniero de Sistemas</Text>
              <Text style={styles.memberDescription}>Frontend & UX/UI</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={[styles.avatar, { backgroundColor: COLORS.secondary + '20' }]}>
                <Ionicons name="person" size={32} color={COLORS.secondary} />
              </View>
              <Text style={styles.memberName}>Sebastian Peñarrieta</Text>
              <Text style={styles.memberRole}>Ingeniero Financiero</Text>
              <Text style={styles.memberDescription}>Finanzas & Estrategia</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={[styles.avatar, { backgroundColor: COLORS.secondary + '20' }]}>
                <Ionicons name="person" size={32} color={COLORS.secondary} />
              </View>
              <Text style={styles.memberName}>Salvador Uscamayta</Text>
              <Text style={styles.memberRole}>Ingeniero Industrial</Text>
              <Text style={styles.memberDescription}>Operaciones & Logística</Text>
            </View>
          </View>
        </View>

        {/* Impacto */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Nuestro Impacto</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="car-sport" size={32} color={COLORS.primary} />
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Conductores Activos</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="people" size={32} color={COLORS.primary} />
              <Text style={styles.statNumber}>2,000+</Text>
              <Text style={styles.statLabel}>Pasajeros Registrados</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="location" size={32} color={COLORS.secondary} />
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Ciudad</Text>
            </View>
          </View>
        </View>

        {/* Contacto */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Contáctanos</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('mailto:contacto@urbango.bo')}
          >
            <Ionicons name="mail" size={20} color={COLORS.primary} />
            <Text style={styles.contactText}>contacto@urbango.bo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('https://urbango.bo')}
          >
            <Ionicons name="globe" size={20} color={COLORS.primary} />
            <Text style={styles.contactText}>www.urbango.bo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('https://instagram.com/urbango.bo')}
          >
            <Ionicons name="logo-instagram" size={20} color={COLORS.primary} />
            <Text style={styles.contactText}>@urbango.bo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('https://facebook.com/urbango')}
          >
            <Ionicons name="logo-facebook" size={20} color={COLORS.primary} />
            <Text style={styles.contactText}>UrbanGo Bolivia</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Hecho en Bolivia
          </Text>
          <Text style={styles.copyrightText}>
            © 2024 UrbanGo. Todos los derechos reservados.
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.lg,
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: SPACING.md,
  },
  version: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  valuesList: {
    gap: SPACING.sm,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  valueText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  teamIntro: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  teamGrid: {
    gap: SPACING.lg,
  },
  teamMember: {
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  memberName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  memberRole: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  memberDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  contactText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  copyrightText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
});
