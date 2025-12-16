# Guía de Inicio Rápido - UrbanGo

## 🚀 Configuración Inicial del Proyecto

### 1. Backend (API)

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus configuraciones
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

**Importante**: Necesitas tener MongoDB corriendo. Puedes instalarlo localmente o usar MongoDB Atlas (nube).

### 2. Frontend (App Móvil)

```bash
cd frontend
npm install
npm start
```

Escanea el código QR con Expo Go para ver la app en tu teléfono.

## 📋 Requisitos Previos

- Node.js v18 o superior
- MongoDB (local o Atlas)
- Expo Go app en tu smartphone
- Git

## 🗺️ Próximos Pasos para Desarrollo

### Fase 1: Configuración Base ✅
- [x] Estructura del proyecto
- [x] Configuración de Git
- [x] Backend base con Express
- [x] Frontend base con React Native
- [x] Modelos de datos

### Fase 2: Autenticación
- [ ] Implementar registro de usuarios
- [ ] Implementar login/logout
- [ ] JWT tokens
- [ ] Navegación autenticada

### Fase 3: Funcionalidad Conductor
- [ ] Crear rutas
- [ ] Editar/eliminar rutas
- [ ] Ver solicitudes de viaje
- [ ] Aceptar/rechazar pasajeros

### Fase 4: Funcionalidad Pasajero
- [ ] Buscar rutas disponibles
- [ ] Ver detalles de rutas
- [ ] Solicitar viaje
- [ ] Ver estado del viaje

### Fase 5: Mapas y Geolocalización
- [ ] Integrar Google Maps / Mapbox
- [ ] Mostrar rutas en mapa
- [ ] Tracking en tiempo real
- [ ] Cálculo de distancias

### Fase 6: Sistema de Pagos
- [ ] Integración de pasarela de pago
- [ ] Historial de transacciones
- [ ] Cartera virtual

### Fase 7: Calificaciones y Reseñas
- [ ] Sistema de calificaciones
- [ ] Comentarios
- [ ] Perfil de reputación

### Fase 8: Notificaciones
- [ ] Notificaciones push
- [ ] Alertas de viaje
- [ ] Chat entre usuarios

## 🔧 Configuraciones Importantes

### API Keys Necesarias
1. **Google Maps API**: Para mapas y geocodificación
2. **MongoDB**: Base de datos
3. **Firebase** (opcional): Para notificaciones push

### Variables de Entorno

**Backend (.env)**:
```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
GOOGLE_MAPS_API_KEY=tu_api_key
```

**Frontend (constants.js)**:
```javascript
GOOGLE_MAPS_API_KEY: 'tu_api_key'
BASE_URL: 'http://tu-ip:3000/api'
```

## 📱 Probar en Dispositivo Real

1. Asegúrate de que tu computadora y smartphone estén en la misma red WiFi
2. En el backend, usa tu IP local en lugar de `localhost`
3. Actualiza `BASE_URL` en el frontend con tu IP local
4. Ejecuta ambos proyectos

## 🐛 Solución de Problemas Comunes

### "Cannot connect to Metro bundler"
- Verifica que estés en la misma red WiFi
- Reinicia Expo con `npm start --clear`

### "MongoDB connection failed"
- Verifica que MongoDB esté corriendo
- Revisa la URI de conexión en `.env`

### "API request failed"
- Verifica que el backend esté corriendo
- Revisa la URL de la API en el frontend
- Usa tu IP local, no `localhost` en dispositivos físicos

## 📚 Recursos Útiles

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Navigation](https://reactnavigation.org/)

## 👥 Equipo

Proyecto de Innovación y Creatividad - UPB

## 📄 Licencia

MIT License
