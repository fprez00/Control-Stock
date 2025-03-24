import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  // Estado inicial
  isAuthenticated: false,
  user: null,

  // Acción para establecer el usuario como autenticado
  login: (userData) => {
    set({
      isAuthenticated: true,
      user: userData,
    });
  },

  // Acción para cerrar sesión
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
