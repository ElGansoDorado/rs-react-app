import type { Pokemon } from '@/shared/model/pokemon.type';
import { vi, type Mock } from 'vitest';
import { mockPokemons } from './pokemons';

export const mockUseBag: {
  list: Pokemon[];
  removePokemon: Mock;
  hasPokemon: Mock;
  addPokemon: Mock;
  clear: Mock;
} = {
  list: [],
  removePokemon: vi.fn(),
  hasPokemon: vi.fn(),
  addPokemon: vi.fn(),
  clear: vi.fn(),
};

export const usePagination = vi.fn().mockImplementation((max: number) => {
  const mockPage = 1;
  const mockSetPage = vi.fn();
  const mockSwitchPage = vi.fn((value: number) => {
    if (mockPage + value < 1 || mockPage + value > max) return;
    mockSetPage(mockPage + value);
  });

  return {
    page: mockPage,
    max,
    setPage: mockSetPage,
    switchPage: mockSwitchPage,
  };
});

export const mockCloseDetail = vi.fn();

export const mockUseFetchPokemonDetail = (overrides = {}) => {
  const defaults = {
    detail: mockPokemons[0],
    isLoading: false,
    isError: false,
    closeDetail: mockCloseDetail,
  };

  return {
    ...defaults,
    ...overrides,
  };
};
