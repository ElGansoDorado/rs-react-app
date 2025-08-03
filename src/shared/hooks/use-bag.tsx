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
        set({
          list: get().hasPokemon(pokemon.name)
            ? get().list.filter((item) => item.name !== pokemon.name)
            : [...get().list, pokemon],
        });
      },

      removePokemon: (name) => {
        set({ list: get().list.filter((item) => item.name !== name) });
      },

      clear: () => set({ list: [] }),
    }),
    {
      name: 'POKEMON-BAG-STORAGE',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
