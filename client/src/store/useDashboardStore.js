import { create } from 'zustand';

export const useDashboardStore = create((set) => ({
  storeName: 'This is the dashboard store',
}));
