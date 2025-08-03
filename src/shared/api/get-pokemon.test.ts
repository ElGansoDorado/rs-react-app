import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getPokemon,
  getPokemonPage,
  getPokemonNumberPage,
  getPokemonDetail,
} from './get-pokemon';

import { mockPokemonsArray, mockPokemons } from '../test-utils/mocks/pokemons';

const mockPokemonList = {
  count: 100,
  results: Array(20).fill(mockPokemonsArray[0]),
};

describe('Pokemon API', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getPokemon', () => {
    it('should return pokemon by name', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonsArray[0],
      } as Response);

      const result = await getPokemon('pikachu');
      expect(result).toEqual([mockPokemonsArray[0]]);
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });

    it('should throw 404 error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getPokemon('unknown')).rejects.toThrow('Resource not found');
    });
  });

  describe('getPokemonPage', () => {
    it('should return pokemon list for page', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonList,
      } as Response);

      const result = await getPokemonPage(1);
      expect(result).toEqual(mockPokemonList.results);
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
      );
    });
  });

  describe('getPokemonNumberPage', () => {
    it('should calculate number of pages', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonList,
      } as Response);

      const result = await getPokemonNumberPage();
      expect(result).toBe(5);
    });
  });

  describe('getPokemonDetail', () => {
    it('should return pokemon details by id', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemons[0],
      } as Response);

      const result = await getPokemonDetail('1');
      expect(result).toEqual(mockPokemons[0]);
    });

    it('should throw error for invalid response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(getPokemonDetail('25')).rejects.toThrow(
        'Internal Server Error'
      );
    });
  });
});
