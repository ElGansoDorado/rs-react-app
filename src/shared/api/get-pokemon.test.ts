import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getPokemon, getPokemonDetail } from './get-pokemon';
import { mockPokemonsArray, mockPokemons } from '../test-utils/mocks/pokemons';

describe('Pokemon API Functions', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getPokemon', () => {
    it('should return pokemon by name with correct structure', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonsArray[0],
      } as Response);

      const result = await getPokemon('pikachu');

      expect(result).toEqual({
        list: [mockPokemonsArray[0]],
        page: 1,
      });
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });

    it('should throw 404 error when pokemon not found', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getPokemon('unknown')).rejects.toThrow('Resource not found');
    });

    it('should handle network errors', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));
      await expect(getPokemon('pikachu')).rejects.toThrow('Network error');
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
      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
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
