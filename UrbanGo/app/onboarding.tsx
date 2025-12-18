import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../config/constants';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: 1,
    icon: 'time-outline',
    title: '¿Sin transporte en horas pico?',
    description: 'En muchas zonas de la ciudad, encontrar trufi o minibús puede ser complicado cuando más lo necesitas.',
    color: COLORS.primary,
  },
  {
    id: 2,
    icon: 'car-outline',
    title: 'Viaja en rutas que ya existen',
    description: 'UrbanGo conecta pasajeros con conductores que ya tienen una ruta diaria hacia su trabajo.',
    color: COLORS.primary,
  },
  {
    id: 3,
    icon: 'speedometer-outline',
    title: 'Más rápido y más económico',
    description: 'Paga menos que un taxi y llega más rápido que esperando transporte público.',
    color: COLORS.primary,
  },
  {
    id: 4,
    icon: 'compass-outline',
    title: '¿Cómo quieres usar UrbanGo?',
    description: 'Elige tu rol y empieza a moverte por la ciudad.',
    color: COLORS.primary,
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * (currentIndex + 1),
        animated: true,
      });
    } else {
      router.replace('/(auth)/login');
    }
  };

  const skip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header con Skip */}
      <View style={styles.header}>
        <Image
          source={require('../assets/LogoUrban.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {currentIndex < ONBOARDING_DATA.length - 1 && (
          <TouchableOpacity onPress={skip} style={styles.skipButton}>
            <Text style={styles.skipText}>Saltar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Carrusel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {ONBOARDING_DATA.map((item) => (
          <View key={item.id} style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={80} color="#1A2F4A" />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Indicadores */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? COLORS.primary : COLORS.textSecondary,
                  width: index === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={goToNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex === 0 ? 'Continuar' : currentIndex === ONBOARDING_DATA.length - 1 ? 'Comenzar' : 'Siguiente'}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  logo: {
    width: SCREEN_WIDTH * 0.35,
    height: 50,
  },
  skipButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  skipText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_WIDTH * 0.35,
    borderRadius: SCREEN_WIDTH * 0.175,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.065,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  description: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: SCREEN_WIDTH * 0.06,
    paddingHorizontal: SPACING.lg,
    maxWidth: SCREEN_WIDTH * 0.85,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  dot: {
    height: 8,
    borderRadius: RADIUS.full,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
    minHeight: 56,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
