import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserDTO } from '../services/dto/auth';

interface AuthState {
  token: string | null;
  user: UserDTO | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: UserDTO) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: !!state.token,
      }),
    },
  ),
);
