import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage'; // Assuming this file exists and exports mmkvStorage

interface PlayerStore {
  user: null | any;
  setUser: (user: any) => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);