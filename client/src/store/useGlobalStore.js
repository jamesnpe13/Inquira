import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export const useGlobalStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      // other non-persistent states can go here
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => {
        let user = null;

        if (accessToken) {
          try {
            user = jwtDecode(accessToken);
          } catch (err) {
            console.error('Failed to decode access token:', err);
          }
        }

        set({ accessToken, user });
      },
    }),
    {
      name: 'theme-storage', // key in localStorage
      getStorage: () => localStorage,
      partialize: (state) => ({ theme: state.theme }), // only persist `theme`
    }
  )
);
