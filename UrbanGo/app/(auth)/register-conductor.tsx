import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterConductor() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    licencia: '',
    vehiculoMarca: '',
    vehiculoModelo: '',
    vehiculoAnio: '',
    vehiculoPlaca: '',
    vehiculoColor: '',
    capacidadPasajeros: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // TODO: Implementar validación y registro
    console.log('Registro Conductor:', formData);
    router.replace('/(conductor-tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Registro de Conductor</Text>
            <Text style={styles.subtitle}>Completa tu información para comenzar a ganar</Text>
          </View>

          {/* Información Personal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: SPACING.sm }]}>
                <Text style={styles.label}>Nombre *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Juan"
                    placeholderTextColor={COLORS.textSecondary}
                    value={formData.nombre}
                    onChangeText={(text) => setFormData({...formData, nombre: text})}
                  />
                </View>
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Apellido *</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Pérez"
                    placeholderTextColor={COLORS.textSecondary}
                    value={formData.apellido}
                    onChangeText={(text) => setFormData({...formData, apellido: text})}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo Electrónico *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="conductor@email.com"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Teléfono *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="+591 7XXXXXXX"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.telefono}
                  onChangeText={(text) => setFormData({...formData, telefono: text})}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={COLORS.textLight} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Contraseña *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons 
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={COLORS.textLight} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Información de Conductor */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Documentación</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Número de Licencia *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="card-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="123456789"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.licencia}
                  onChangeText={(text) => setFormData({...formData, licencia: text})}
                />
              </View>
              <Text style={styles.helperText}>Ingresa tu número de licencia de conducir vigente</Text>
            </View>
          </View>

          {/* Información del Vehículo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información del Vehículo</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: SPACING.sm }]}>
                <Text style={styles.label}>Marca *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="car-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Toyota"
                    placeholderTextColor={COLORS.textSecondary}
                    value={formData.vehiculoMarca}
                    onChangeText={(text) => setFormData({...formData, vehiculoMarca: text})}
                  />
                </View>
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Modelo *</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Corolla"
                    placeholderTextColor={COLORS.textSecondary}
                    value={formData.vehiculoModelo}
                    onChangeText={(text) => setFormData({...formData, vehiculoModelo: text})}
                  />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: SPACING.sm }]}>
                <Text style={styles.label}>Año *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="calendar-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="2020"
                    placeholderTextColor={COLORS.textSecondary}
                    value={formData.vehiculoAnio}
                    onChangeText={(text) => setFormData({...formData, vehiculoAnio: text})}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>Color *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="color-palette-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Blanco"
                    placeholderTextColor={COLORS.textSecondary}
                    value={formData.vehiculoColor}
                    onChangeText={(text) => setFormData({...formData, vehiculoColor: text})}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Placa *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="document-text-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="1234ABC"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.vehiculoPlaca}
                  onChangeText={(text) => setFormData({...formData, vehiculoPlaca: text.toUpperCase()})}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Capacidad de Pasajeros *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="people-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="4"
                  placeholderTextColor={COLORS.textSecondary}
                  value={formData.capacidadPasajeros}
                  onChangeText={(text) => setFormData({...formData, capacidadPasajeros: text})}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.helperText}>Número máximo de pasajeros que puedes llevar</Text>
            </View>
          </View>

          {/* Botón de Registro */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Crear Cuenta de Conductor</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Al registrarte, aceptas nuestros </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Términos y Condiciones</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
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
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  eyeIcon: {
    padding: SPACING.xs,
  },
  helperText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  registerButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    flexWrap: 'wrap',
  },
  footerText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  footerLink: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
