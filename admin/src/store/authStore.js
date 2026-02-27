
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api.js';

const useAuthStore = create(
  persist(
    (set) => ({
      admin: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        const { admin, accessToken, refreshToken } = data.data;
        set({ admin, accessToken, refreshToken, isAuthenticated: true });
        return admin;
      },

      logout: async () => {
        try { await api.post('/auth/logout'); } catch (_) {}
        set({ admin: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      updateAdmin: (updates) =>
        set((state) => ({ admin: { ...state.admin, ...updates } })),
    }),
    {
      name: 'apc-admin-auth',
      // Only persist what's needed — keeps localStorage clean
      partialize: (state) => ({
        admin: state.admin,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;