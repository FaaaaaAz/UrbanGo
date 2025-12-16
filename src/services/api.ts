import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG } from '../../config/constants';
import { ApiResponse } from '../types';

// Crear instancia de axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
apiClient.interceptors.request.use(
  async (config) => {
    // TODO: Agregar lógica para obtener el token de AsyncStorage
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      console.error('Error de red:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: (email: string, password: string) => 
    apiClient.post('/auth/login', { email, password }),
  
  register: (userData: any) => 
    apiClient.post('/auth/register', userData),
  
  logout: () => 
    apiClient.post('/auth/logout'),
};

// Servicios de usuario
export const userService = {
  getProfile: () => 
    apiClient.get('/users/profile'),
  
  updateProfile: (userData: any) => 
    apiClient.put('/users/profile', userData),
  
  getUserById: (userId: string) => 
    apiClient.get(`/users/${userId}`),
};

// Servicios de rutas
export const routeService = {
  getRoutes: (filters?: any) => 
    apiClient.get('/routes', { params: filters }),
  
  createRoute: (routeData: any) => 
    apiClient.post('/routes', routeData),
  
  getRouteById: (routeId: string) => 
    apiClient.get(`/routes/${routeId}`),
  
  updateRoute: (routeId: string, routeData: any) => 
    apiClient.put(`/routes/${routeId}`, routeData),
  
  deleteRoute: (routeId: string) => 
    apiClient.delete(`/routes/${routeId}`),
};

// Servicios de viajes
export const rideService = {
  getRides: () => 
    apiClient.get('/rides'),
  
  requestRide: (rideData: any) => 
    apiClient.post('/rides', rideData),
  
  acceptRide: (rideId: string) => 
    apiClient.put(`/rides/${rideId}/accept`),
  
  completeRide: (rideId: string) => 
    apiClient.put(`/rides/${rideId}/complete`),
  
  cancelRide: (rideId: string, reason: string) => 
    apiClient.put(`/rides/${rideId}/cancel`, { reason }),
  
  rateRide: (rideId: string, rating: any) => 
    apiClient.post(`/rides/${rideId}/rate`, rating),
};

export default apiClient;
