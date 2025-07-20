import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setLineSearch } from './search-save';
import { getPokemons } from './get-pokemon';
import {
  mockPokemons,
  mockPokemonPathResponse,
  mockPokemonArrayResponse,
  mockPokemonEmptyResponse,
  mockPokemonResponse,
} from '../test-utils/mocks/pokemons';

vi.mock('./search-save', () => ({
  setLineSearch: vi.fn(),
}));

describe('Pokemon API', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch all pokemons when search is empty', async () => {
    vi.mocked(fetch).mockResolvedValue(mockPokemonEmptyResponse());

    await getPokemons('');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
    expect(setLineSearch).toHaveBeenCalledWith('');
  });

  it('should fetch single pokemon when search is not empty', async () => {
    vi.mocked(fetch).mockResolvedValue(mockPokemonArrayResponse());
    const result = await getPokemons('bulbasaur');

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(setLineSearch).toHaveBeenCalledWith('bulbasaur');
    expect(result).toEqual([mockPokemons[0]]);
  });

  it.each([404, 500, 100])(
    'should return empty array on error',
    async (status) => {
      vi.mocked(fetch).mockResolvedValue({ ok: false, status } as Response);
      const result = await getPokemons('invalid');
      expect(result).toEqual([]);
    }
  );

  it('should fetch all pokemons and their details when search is empty', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(mockPokemonPathResponse())
      .mockResolvedValueOnce(mockPokemonResponse(mockPokemons[0]))
      .mockResolvedValueOnce(mockPokemonResponse(mockPokemons[1]));

    const result = await getPokemons('');

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/2');
    expect(result).toEqual(mockPokemons);
  });
});
