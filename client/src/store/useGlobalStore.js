import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* User session slice */
const sessionSlice = (set) => ({
  user: null,
  accessToken: null,
  storeName: 'globalStore / sessionSlice',

  setUser: (user) => set({ user }),
});

export const useGlobalStore = create((set, get) => ({
  ...sessionSlice(set, get), // user session
  // add more slices if needed
}));
