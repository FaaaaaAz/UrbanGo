export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipoUsuario: 'conductor' | 'pasajero' | 'ambos';
  fotoPerfil?: string;
  calificacion: number;
  numeroCalificaciones: number;
  vehiculo?: Vehiculo;
  licenciaConducir?: LicenciaConducir;
  verificado: boolean;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehiculo {
  marca: string;
  modelo: string;
  anio: number;
  color: string;
  placa: string;
  capacidad: number;
}

export interface LicenciaConducir {
  numero: string;
  fechaVencimiento: Date;
}

export interface Coordenadas {
  latitud: number;
  longitud: number;
}

export interface Punto {
  direccion: string;
  coordenadas: Coordenadas;
}

export interface Route {
  id: string;
  conductorId: string;
  conductor?: User;
  nombre: string;
  descripcion?: string;
  puntoInicio: Punto;
  puntoFin: Punto;
  puntosIntermedios: PuntoIntermedio[];
  diasSemana: DiaSemana[];
  horaSalida: string;
  horaLlegadaAprox?: string;
  precioSugerido: number;
  espaciosDisponibles: number;
  activa: boolean;
  recurrente: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PuntoIntermedio extends Punto {
  orden: number;
}

export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export interface Ride {
  id: string;
  rutaId: string;
  ruta?: Route;
  conductorId: string;
  conductor?: User;
  pasajeroId: string;
  pasajero?: User;
  fecha: Date;
  puntoRecogida: Punto;
  puntoBajada: Punto;
  precio: number;
  estado: EstadoViaje;
  calificacionConductor?: Calificacion;
  calificacionPasajero?: Calificacion;
  canceladoPor?: string;
  motivoCancelacion?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EstadoViaje = 'pendiente' | 'aceptado' | 'en_curso' | 'completado' | 'cancelado';

export interface Calificacion {
  puntuacion: number;
  comentario?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
