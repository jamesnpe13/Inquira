import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGlobalStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      // other non-persistent states can go here
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: 'theme-storage', // key in localStorage
      getStorage: () => localStorage,
      partialize: (state) => ({ theme: state.theme }), // only persist `theme`
    }
  )
);
