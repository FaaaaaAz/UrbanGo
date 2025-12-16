// Utilidades generales

export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} Bs`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-BO');
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^[67]\d{7}$/;
  return re.test(phone);
};
