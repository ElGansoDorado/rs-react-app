import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getPokemon,
  getPokemonPage,
  getPokemonNumberPage,
  getPokemonDetail,
} from './get-pokemon';

const mockPokemon = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/25/',
};

const mockPokemonDetail = {
  id: 25,
  name: 'pikachu',
  sprites: { front_default: 'pikachu.png' },
  types: [{ type: { name: 'electric' } }],
};

const mockPokemonList = {
  count: 100,
  results: Array(20).fill(mockPokemon),
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
        json: async () => mockPokemon,
      } as Response);

      const result = await getPokemon('pikachu');
      expect(result).toEqual([mockPokemon]);
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
        json: async () => mockPokemonDetail,
      } as Response);

      const result = await getPokemonDetail('25');
      expect(result).toEqual(mockPokemonDetail);
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
