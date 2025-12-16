# UrbanGo 🚗

## Descripción
UrbanGo es una plataforma innovadora que transforma vehículos particulares en transporte compartido durante horas pico. Conectamos conductores con rutas definidas con pasajeros que necesitan movilizarse en la misma dirección.

## 🎯 Problema que resolvemos
- **Alta demanda** en zonas con poco transporte público
- **Horas pico** con escasez de movilidad
- **Necesidad de ingresos extra** para conductores con rutas diarias

## 💡 Propuesta de Valor
- **Para Conductores**: Genera ingresos extra aprovechando tu ruta diaria al trabajo
- **Para Pasajeros**: Alternativa económica entre transporte público (2.5 Bs) y taxi (15+ Bs)
- **Precio**: 4-6 Bs aproximadamente

## 🚀 Diferenciador
A diferencia de Uber o servicios de taxi tradicionales, UrbanGo se basa en rutas preestablecidas por los conductores. No es un servicio punto a punto, sino compartir tu trayecto habitual, haciendo el servicio más económico y sostenible.

## 🛠️ Tecnologías
- **Framework**: React Native + Expo
- **Lenguaje**: TypeScript
- **Navegación**: Expo Router
- **UI**: React Native Components
- **Mapas**: Google Maps API / Mapbox (por implementar)

## 📁 Estructura del Proyecto
```
UrbanGo/
├── app/                    # Rutas de la aplicación (Expo Router)
│   ├── (auth)/            # Pantallas de autenticación
│   ├── (drawer)/          # Navegación con drawer
│   │   ├── (tabs)/        # Navegación con tabs
│   │   └── (admin)/       # Panel de administración
│   ├── index.tsx          # Pantalla inicial
│   ├── onboarding.tsx     # Onboarding
│   └── _layout.tsx        # Layout raíz
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── config/           # Configuración
│   ├── features/         # Features específicos (chat, etc)
│   ├── hooks/            # Custom hooks
│   ├── services/         # Servicios API
│   ├── store/            # Estado global
│   ├── types/            # TypeScript types
│   └── utils/            # Utilidades
├── assets/               # Imágenes y recursos
├── config/              # Archivos de configuración
└── .env.example         # Variables de entorno ejemplo
```

## 🚀 Comenzar

### Instalación

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm start
```

Luego escanea el código QR con **Expo Go** en tu teléfono móvil.

### Ejecutar en plataformas específicas

```bash
npm run android    # Android
npm run ios        # iOS (solo en Mac)
npm run web        # Web
```

## 📱 Pantallas

- **Inicio**: Pantalla de bienvenida
- **Onboarding**: Selección de rol (Conductor/Pasajero)
- **Login/Registro**: Autenticación
- **Home**: Dashboard principal
- **Rutas**: Explorar rutas disponibles
- **Viajes**: Historial de viajes
- **Perfil**: Gestión de perfil
- **Chat**: Mensajería
- **Configuración**: Ajustes de la app

## 👥 Equipo
Proyecto desarrollado como parte de la materia de Innovación y Creatividad - UPB

## 📄 Licencia
MIT License
