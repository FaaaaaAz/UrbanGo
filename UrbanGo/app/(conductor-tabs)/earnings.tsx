import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// Mock data para historial de comisiones (15% de comisión)
const historialComisiones = [
  {
    id: 4821,
    fecha: '2026-03-11',
    tarifa: 5,
    comision: 0.75, // 15% de 5
  },
  {
    id: 4820,
    fecha: '2026-03-11',
    tarifa: 7,
    comision: 1.05, // 15% de 7
  },
  {
    id: 4819,
    fecha: '2026-03-10',
    tarifa: 4,
    comision: 0.6, // 15% de 4
  },
  {
    id: 4818,
    fecha: '2026-03-10',
    tarifa: 5,
    comision: 0.75, // 15% de 5
  },
];

export default function ConductorEarnings() {
  const [modalPagoVisible, setModalPagoVisible] = useState(false);
  
  // Estado del saldo de comisión
  const saldoComision = 32; // Cuánto debe el conductor a la app
  const limiteComision = 50; // Límite antes del bloqueo
  const gananciasHoy = 120;
  const porcentajeComision = (saldoComision / limiteComision) * 100;
  const cuentaBloqueada = saldoComision >= limiteComision;

  const handlePagarSaldo = (metodo: string) => {
    // Aquí iría la lógica de pago
    console.log(`Pagar con: ${metodo}`);
    setModalPagoVisible(false);
    // Después de pagar, el saldo se actualizaría a 0
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Billetera</Text>
          <Text style={styles.headerSubtitle}>Gestiona tus ganancias y pagos</Text>
        </View>

        <View style={styles.content}>
          {/* Saldo de Comisión - Parte principal del bloqueo */}
          <View style={[
            styles.comisionCard,
            cuentaBloqueada && styles.comisionCardBloqueada
          ]}>
            <View style={styles.comisionHeader}>
              <Ionicons 
                name="wallet-outline" 
                size={28} 
                color={cuentaBloqueada ? COLORS.error : COLORS.primary} 
              />
              <Text style={styles.comisionTitle}>Saldo de comisión</Text>
            </View>

            <View style={styles.comisionInfo}>
              <Text style={styles.comisionLabel}>Debes a la app:</Text>
              <Text style={[
                styles.comisionAmount,
                cuentaBloqueada && styles.comisionAmountError
              ]}>
                {saldoComision} Bs
              </Text>
              <Text style={styles.comisionLimite}>Límite de pago: {limiteComision} Bs</Text>
            </View>

            {/* Barra visual de progreso */}
            <View style={styles.barraContainer}>
              <View style={styles.barraLabels}>
                <Text style={styles.barraText}>{saldoComision} / {limiteComision} Bs</Text>
                <Text style={[
                  styles.estadoText,
                  cuentaBloqueada ? styles.estadoTextError : styles.estadoTextSuccess
                ]}>
                  {cuentaBloqueada ? '🔴 Bloqueado' : '🟢 Activo'}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: `${Math.min(porcentajeComision, 100)}%` },
                  cuentaBloqueada && styles.progressFillError
                ]} />
              </View>
            </View>

            {/* Estado y mensaje */}
            <View style={[
              styles.estadoCard,
              cuentaBloqueada ? styles.estadoCardError : styles.estadoCardSuccess
            ]}>
              <Text style={[
                styles.estadoMessage,
                cuentaBloqueada ? styles.estadoMessageError : styles.estadoMessageSuccess
              ]}>
                {cuentaBloqueada 
                  ? '⚠️ Cuenta bloqueada hasta pagar' 
                  : '✓ Puedes seguir trabajando'
                }
              </Text>
            </View>

            {/* Botón de pago */}
            <TouchableOpacity 
              style={styles.pagarButton}
              onPress={() => setModalPagoVisible(true)}
            >
              <Ionicons name="card-outline" size={20} color={COLORS.white} />
              <Text style={styles.pagarButtonText}>Pagar saldo</Text>
            </TouchableOpacity>
          </View>

          {/* Ganancias de hoy */}
          <View style={styles.gananciasCard}>
            <View style={styles.gananciasIcon}>
              <Ionicons name="cash-outline" size={28} color={COLORS.secondary} />
            </View>
            <View style={styles.gananciasInfo}>
              <Text style={styles.gananciasLabel}>Ganancias de hoy</Text>
              <Text style={styles.gananciasValue}>{gananciasHoy} Bs</Text>
            </View>
          </View>

          {/* Bonos disponibles */}
          <View style={styles.bonosCard}>
            <View style={styles.bonosHeader}>
              <Ionicons name="gift" size={24} color={COLORS.secondary} />
              <Text style={styles.bonosTitle}>Bonos disponibles</Text>
            </View>
            <View style={styles.bonoItem}>
              <View style={styles.bonoIconWrapper}>
                <Ionicons name="trophy" size={20} color="#FFB800" />
              </View>
              <Text style={styles.bonoText}>Completa 10 viajes → +20 Bs</Text>
            </View>
            <View style={styles.bonoProgress}>
              <View style={styles.bonoProgressBar}>
                <View style={[styles.bonoProgressFill, { width: '70%' }]} />
              </View>
              <Text style={styles.bonoProgressText}>7/10 viajes</Text>
            </View>
          </View>

          {/* Historial de comisiones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historial de comisiones</Text>

            {historialComisiones.map((carrera) => (
              <View key={carrera.id} style={styles.comisionHistorialCard}>
                <View style={styles.comisionHistorialHeader}>
                  <View style={styles.comisionHistorialTitleRow}>
                    <Ionicons name="car-sport" size={18} color={COLORS.primary} />
                    <Text style={styles.comisionHistorialId}>Carrera #{carrera.id}</Text>
                  </View>
                  <Text style={styles.comisionHistorialComision}>{carrera.comision} Bs</Text>
                </View>
                
                <View style={styles.comisionHistorialDetails}>
                  <View style={styles.comisionHistorialRow}>
                    <Text style={styles.comisionHistorialLabel}>Tarifa:</Text>
                    <Text style={styles.comisionHistorialValue}>{carrera.tarifa} Bs</Text>
                  </View>
                  <View style={styles.comisionHistorialRow}>
                    <Text style={styles.comisionHistorialLabel}>Comisión:</Text>
                    <Text style={styles.comisionHistorialValueHighlight}>{carrera.comision} Bs</Text>
                  </View>
                </View>

                <Text style={styles.comisionHistorialFecha}>{carrera.fecha}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal de opciones de pago */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPagoVisible}
        onRequestClose={() => setModalPagoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pagar con:</Text>
              <TouchableOpacity 
                onPress={() => setModalPagoVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalOptions}>
              <TouchableOpacity 
                style={styles.modalOption}
                onPress={() => handlePagarSaldo('QR')}
              >
                <Ionicons name="qr-code" size={32} color={COLORS.primary} />
                <Text style={styles.modalOptionText}>QR</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalOption}
                onPress={() => handlePagarSaldo('Transferencia')}
              >
                <Ionicons name="swap-horizontal" size={32} color={COLORS.primary} />
                <Text style={styles.modalOptionText}>Transferencia</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalOption}
                onPress={() => handlePagarSaldo('Tigo Money')}
              >
                <Ionicons name="phone-portrait" size={32} color={COLORS.primary} />
                <Text style={styles.modalOptionText}>Tigo Money</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalOption}
                onPress={() => handlePagarSaldo('Tarjeta')}
              >
                <Ionicons name="card" size={32} color={COLORS.primary} />
                <Text style={styles.modalOptionText}>Tarjeta</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalFooter}>
              <Text style={styles.modalFooterText}>Monto a pagar: {saldoComision} Bs</Text>
            </View>
          </View>
        </View>
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
    paddingTop: 60,
    paddingBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    padding: SPACING.lg,
  },
  
  // Estilos para Saldo de Comisión (Bloqueo)
  comisionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 3,
    borderWidth: 2,
    borderColor: COLORS.secondary + '30',
  },
  comisionCardBloqueada: {
    borderColor: COLORS.error,
    backgroundColor: '#FFF5F5',
  },
  comisionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  comisionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  comisionInfo: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  comisionLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  comisionAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  comisionAmountError: {
    color: COLORS.error,
  },
  comisionLimite: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  barraContainer: {
    marginBottom: SPACING.md,
  },
  barraLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  barraText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  estadoText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  estadoTextSuccess: {
    color: '#10B981',
  },
  estadoTextError: {
    color: COLORS.error,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.md,
  },
  progressFillError: {
    backgroundColor: COLORS.error,
  },
  estadoCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  estadoCardSuccess: {
    backgroundColor: '#10B98120',
  },
  estadoCardError: {
    backgroundColor: COLORS.error + '20',
  },
  estadoMessage: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  estadoMessageSuccess: {
    color: '#10B981',
  },
  estadoMessageError: {
    color: COLORS.error,
  },
  pagarButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  pagarButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },

  // Estilos para Ganancias de hoy
  gananciasCard: {
    backgroundColor: COLORS.secondary + '15',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.secondary + '30',
  },
  gananciasIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gananciasInfo: {
    flex: 1,
  },
  gananciasLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  gananciasValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },

  // Estilos para Bonos
  bonosCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
  },
  bonosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  bonosTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  bonoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  bonoIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFB80020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bonoText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  bonoProgress: {
    gap: SPACING.xs,
  },
  bonoProgressBar: {
    height: 8,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  bonoProgressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.sm,
  },
  bonoProgressText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'right',
  },

  // Estilos para Historial de comisiones
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  comisionHistorialCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  comisionHistorialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  comisionHistorialTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  comisionHistorialId: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  comisionHistorialComision: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  comisionHistorialDetails: {
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  comisionHistorialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comisionHistorialLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  comisionHistorialValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  comisionHistorialValueHighlight: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  comisionHistorialFecha: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },

  // Estilos para Modal de pago
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.xl,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundLight,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalCloseButton: {
    padding: SPACING.xs,
  },
  modalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  modalOption: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  modalOptionText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  modalFooter: {
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  modalFooterText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
