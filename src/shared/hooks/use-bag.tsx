import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Pokemon } from '../model/pokemon.type';

interface BagState {
  list: Pokemon[];
  hasPokemon: (name: string) => boolean;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (name: string) => void;
  clear: () => void;
}

export const useBag = create<BagState>()(
  persist(
    (set, get) => ({
      list: [],

      hasPokemon: (name) => {
        return get().list.some((pokemon) => pokemon.name === name);
      },

      addPokemon: (pokemon) => {
        const currentList = get().list;
        const exists = currentList.some((p) => p.name === pokemon.name);

        set({
          list: exists
            ? currentList.filter((item) => item.name !== pokemon.name)
            : [...currentList, pokemon],
        });
      },

      removePokemon: (name) => {
        const currentList = get().list;
        set({ list: currentList.filter((item) => item.name !== name) });
      },

      clear: () => set({ list: [] }),
    }),
    {
      name: 'pokemon-bag-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
