import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { usePokemonList } from './use-pokemon-list';
import { useLineSearch } from '@/shared/hooks/use-line-search';
import { mockPokemonsArray } from '@/shared/test-utils/mocks/pokemons';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/shared/api/get-pokemon', () => ({
  getPokemon: vi.fn(),
  getPokemonPage: vi.fn(),
}));

vi.mock('@/shared/hooks/use-line-search', () => ({
  useLineSearch: vi.fn(),
}));

const mockSearchLine = '';

describe('usePokemonList', () => {
  const mockSetSearchParams = vi.fn();
  const mockSetSearchLine = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();

    vi.clearAllMocks();

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);

    vi.mocked(useLineSearch).mockReturnValue({
      searchLine: mockSearchLine,
      setSearchLine: mockSetSearchLine,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return pokemons list when page query is provided', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      mockSetSearchParams,
    ]);

    const { getPokemonPage } = await import('../../../shared/api/get-pokemon');
    vi.mocked(getPokemonPage).mockResolvedValue(mockPokemonsArray);

    const { result } = renderHook(() => usePokemonList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.pokemonsList).toEqual([]);

    await act(async () => {
      vi.runAllTimers();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemonsList).toEqual(mockPokemonsArray);
    expect(getPokemonPage).toHaveBeenCalledWith(1);
  });

  it('should return single pokemon when search query is provided', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('search=pikachu'),
      mockSetSearchParams,
    ]);

    const { getPokemon } = await import('../../../shared/api/get-pokemon');
    vi.mocked(getPokemon).mockResolvedValue([mockPokemonsArray[0]]);

    const { result } = renderHook(() => usePokemonList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.pokemonsList).toEqual([]);

    await act(async () => {
      vi.runAllTimers();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemonsList).toEqual([mockPokemonsArray[0]]);
    expect(getPokemon).toHaveBeenCalledWith('pikachu');
  });

  it('should set default page=1 when no params provided', async () => {
    renderHook(() => usePokemonList());

    await act(async () => {
      vi.runAllTimers();
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        get: expect.any(Function),
        set: expect.any(Function),
      })
    );
  });

  it('should handle API errors gracefully', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('page=1'),
      mockSetSearchParams,
    ]);

    const { getPokemonPage } = await import('../../../shared/api/get-pokemon');
    vi.mocked(getPokemonPage).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => usePokemonList());

    await act(async () => {
      vi.runAllTimers();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemonsList).toEqual([]);
  });
});
