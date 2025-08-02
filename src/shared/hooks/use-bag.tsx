import { create } from 'zustand';
import type { Pokemon } from '../model/pokemon.type';

interface BagState {
  list: Pokemon[];
  hasPokemon: (name: string) => boolean;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (name: string) => void;
  clear: () => void;
}

export const useBag = create<BagState>((set, get) => ({
  list: [],

  hasPokemon: (name) => {
    return get().list.some((pokemon) => pokemon.name === name);
  },

  addPokemon: (pokemon) =>
    set((state) => {
      if (state.hasPokemon(pokemon.name)) {
        return state;
      }

      return { list: [...state.list, pokemon] };
    }),

  removePokemon: (name) =>
    set((state) => {
      return { list: state.list.filter((item) => item.name !== name) };
    }),

  clear: () =>
    set(() => {
      return { list: [] };
    }),
}));
