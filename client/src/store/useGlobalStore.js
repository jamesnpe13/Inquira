import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const sessionSlice = (set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
});

export const useGlobalStore = create((set, get) => ({
  ...sessionSlice(set, get),

  // add more slices if needed
}));
