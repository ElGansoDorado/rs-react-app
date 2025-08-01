import { create } from 'zustand';
import type { PokemonType } from '../model/pokemon.type';

interface BagState {
  list: PokemonType[];
  hasPokemon: (name: string) => boolean;
  addPokemon: (pokemon: PokemonType) => void;
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
