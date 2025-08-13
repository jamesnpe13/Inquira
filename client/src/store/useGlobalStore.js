import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  user: {
    username: 'jamesnpe13',
    firstname: 'James',
  },
  setUser: (user) => set({ user: user }),
}));
