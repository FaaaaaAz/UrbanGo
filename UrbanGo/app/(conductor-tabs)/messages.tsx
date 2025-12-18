import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../../config/constants';
import { Ionicons } from '@expo/vector-icons';

// Mock data de conversación típica (misma conversación pero desde perspectiva del conductor)
const conversacionMock = [
  {
    id: 1,
    texto: 'Hola! Ya estoy en camino hacia el punto de encuentro',
    hora: '17:00',
    esPropio: true, // Mensaje del conductor (propio)
    remitente: 'Tú',
  },
  {
    id: 2,
    texto: 'Perfecto! Yo ya estoy esperando en Plaza Abaroa',
    hora: '17:02',
    esPropio: false, // Mensaje del pasajero
    remitente: 'Juan Pérez',
  },
  {
    id: 3,
    texto: 'Excelente, llegaré en unos 5 minutos. Hay un poco de congestionamiento.',
    hora: '17:04',
    esPropio: true,
    remitente: 'Tú',
  },
  {
    id: 4,
    texto: 'Entendido, te estaré esperando',
    hora: '17:07',
    esPropio: false,
    remitente: 'Juan Pérez',
  },
  {
    id: 5,
    texto: 'Ya llegué! Estoy al frente de la plaza',
    hora: '17:10',
    esPropio: true,
    remitente: 'Tú',
  },
];

// Mock data de lista de chats
const listaChats = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    rol: 'Pasajero',
    ultimoMensaje: 'Entendido, te estaré esperando',
    hora: '17:07',
    noLeidos: 0,
  },
];

export default function Messages() {
  const [chatAbierto, setChatAbierto] = useState(false);
  const [mensajes, setMensajes] = useState(conversacionMock);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const enviarMensaje = () => {
    if (nuevoMensaje.trim()) {
      const mensaje = {
        id: mensajes.length + 1,
        texto: nuevoMensaje,
        hora: new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }),
        esPropio: true,
        remitente: 'Tú',
      };
      setMensajes([...mensajes, mensaje]);
      setNuevoMensaje('');
    }
  };

  if (chatAbierto) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView 
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Header del chat */}
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setChatAbierto(false)} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <View style={styles.pasajeroInfo}>
              <View style={styles.avatarSmall}>
                <Ionicons name="person" size={20} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.pasajeroNombre}>Juan Pérez</Text>
                <Text style={styles.pasajeroRol}>Pasajero</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Mensajes */}
          <FlatList
            data={mensajes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.messagesList}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.esPropio ? styles.messageRight : styles.messageLeft]}>
                <View style={[styles.messageBubble, item.esPropio ? styles.bubblePropio : styles.bubbleOtro]}>
                  <Text style={[styles.messageText, item.esPropio ? styles.textPropio : styles.textOtro]}>
                    {item.texto}
                  </Text>
                  <Text style={[styles.messageTime, item.esPropio ? styles.timePropio : styles.timeOtro]}>
                    {item.hora}
                  </Text>
                </View>
              </View>
            )}
          />

          {/* Input de mensaje */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Escribe un mensaje..."
                placeholderTextColor={COLORS.textLight}
                value={nuevoMensaje}
                onChangeText={setNuevoMensaje}
                multiline
              />
              <TouchableOpacity style={styles.sendButton} onPress={enviarMensaje}>
                <Ionicons name="send" size={22} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Lista de chats
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mensajes</Text>
      </View>

      <FlatList
        data={listaChats}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => setChatAbierto(true)}
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color={COLORS.primary} />
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatRow}>
                <Text style={styles.chatNombre}>{item.nombre}</Text>
                <Text style={styles.chatHora}>{item.hora}</Text>
              </View>
              <View style={styles.chatRow}>
                <Text style={styles.chatMensaje} numberOfLines={1}>{item.ultimoMensaje}</Text>
                {item.noLeidos > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.noLeidos}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.chatRol}>{item.rol}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No tienes mensajes aún</Text>
            <Text style={styles.emptySubtext}>Los mensajes con tus pasajeros aparecerán aquí</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  chatList: {
    padding: SPACING.md,
  },
  chatItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    elevation: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatNombre: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  chatHora: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  chatMensaje: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    flex: 1,
    marginRight: SPACING.sm,
  },
  chatRol: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: COLORS.secondary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  // Chat screen
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundDark,
  },
  backButton: {
    padding: SPACING.xs,
    marginRight: SPACING.sm,
  },
  pasajeroInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pasajeroNombre: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  pasajeroRol: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  callButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.secondary + '20',
    borderRadius: RADIUS.full,
  },
  messagesList: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  messageContainer: {
    marginBottom: SPACING.md,
    maxWidth: '75%',
  },
  messageLeft: {
    alignSelf: 'flex-start',
  },
  messageRight: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  bubbleOtro: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
  },
  bubblePropio: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: FONT_SIZES.md,
    marginBottom: 4,
  },
  textOtro: {
    color: COLORS.text,
  },
  textPropio: {
    color: COLORS.white,
  },
  messageTime: {
    fontSize: FONT_SIZES.xs,
  },
  timeOtro: {
    color: COLORS.textLight,
  },
  timePropio: {
    color: COLORS.white,
    opacity: 0.8,
  },
  inputContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundDark,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.secondary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
