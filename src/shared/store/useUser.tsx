import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../model/user.types';

interface BagState {
  list: User[];
  addUser: (pokemon: User) => void;
  removeUser: (name: string) => void;
  clear: () => void;
}

export const useUser = create<BagState>()(
  persist(
    (set, get) => ({
      list: [],

      addUser: (pokemon) => {
        set({ list: [...get().list, pokemon] });
      },

      removeUser: (name) => {
        set({ list: get().list.filter((item) => item.username !== name) });
      },

      clear: () => set({ list: [] }),
    }),
    {
      name: 'USER-STORAGE',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
