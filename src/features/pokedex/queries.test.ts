import { renderHook, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFetchPokemonList } from './queries';
import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import { mockPokemonsArray } from '@/shared/test-utils/mocks/pokemons';
import type { PokemonPath } from '@/shared/model/pokemon.type';

vi.mock('react-router-dom');
vi.mock('@tanstack/react-query');
vi.mock('@/shared/api/get-pokemon');

type responseType = {
  data: PokemonPath[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

describe('useFetchPokemonList', () => {
  const mockPokemonData = {
    list: [mockPokemonsArray[0]],
    page: 1,
  };

  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue([mockSearchParams]);

    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as responseType);

    vi.mocked(getPokemonPage).mockResolvedValue(mockPokemonData);
    vi.mocked(getPokemon).mockResolvedValue(mockPokemonData);
  });

  it('should return initial state with empty data', () => {
    const { result } = renderHook(() => useFetchPokemonList());

    expect(result.current).toEqual({
      data: { list: [], page: 1 },
      isLoading: false,
      isError: false,
    });
  });

  it('should call getPokemon when search query exists', async () => {
    mockSearchParams.set('search', 'pikachu');

    renderHook(() => useFetchPokemonList());

    await waitFor(() => {
      expect(useQuery).toHaveBeenCalledWith({
        queryKey: ['pokemons', 1, 'pikachu'],
        queryFn: expect.any(Function),
      });

      expect(getPokemonPage).not.toHaveBeenCalled();
    });
  });

  it('should return loading state', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as responseType);

    const { result } = renderHook(() => useFetchPokemonList());

    expect(result.current.isLoading).toBe(true);
  });

  it('should return error state', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as responseType);

    const { result } = renderHook(() => useFetchPokemonList());

    expect(result.current.isError).toBe(true);
  });

  it('should return paginated data', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
    } as responseType);

    const { result } = renderHook(() => useFetchPokemonList());

    expect(result.current.data).toEqual(mockPokemonData);
  });

  it('should return search data', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
    } as responseType);

    const { result } = renderHook(() => useFetchPokemonList());

    expect(result.current.data).toEqual(mockPokemonData);
  });

  it('should handle invalid page number', () => {
    mockSearchParams.set('page', 'invalid');

    const { result } = renderHook(() => useFetchPokemonList());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['pokemons', 1, ''],
      queryFn: expect.any(Function),
    });
    expect(result.current.data.page).toBe(1);
  });

  it('should handle API error gracefully', async () => {
    vi.mocked(getPokemonPage).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useFetchPokemonList());

    await waitFor(() => {
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual({ list: [], page: 1 });
    });
  });
});
