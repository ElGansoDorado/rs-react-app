import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFetchPokemonDetail } from './queries';
import { getPokemonDetail } from '@/shared/api/get-pokemon';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { mockPokemons } from '@/shared/test-utils/mocks/pokemons';
import type { QueryTypeDetai } from '@/shared/test-utils/mocks/use-query';

vi.mock('react-router-dom');
vi.mock('@tanstack/react-query');
vi.mock('@/shared/api/get-pokemon');

describe('useFetchPokemonDetail', () => {
  const mockSetSearchParams = vi.fn();
  let mockSearchParams: URLSearchParams;
  const mockPokemonData = mockPokemons[0];

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();

    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as QueryTypeDetai);

    vi.mocked(getPokemonDetail).mockResolvedValue(mockPokemonData);
  });

  it('should return initial state without details param', () => {
    const { result } = renderHook(() => useFetchPokemonDetail());

    expect(result.current).toEqual({
      detail: undefined,
      isLoading: false,
      isError: false,
      closeDetail: expect.any(Function),
    });
  });

  it('should return loading state', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as QueryTypeDetai);

    const { result } = renderHook(() => useFetchPokemonDetail());

    expect(result.current.isLoading).toBe(true);
  });

  it('should return error state', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as QueryTypeDetai);

    const { result } = renderHook(() => useFetchPokemonDetail());

    expect(result.current.isError).toBe(true);
  });

  it('should return pokemon detail data', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
    } as QueryTypeDetai);

    const { result } = renderHook(() => useFetchPokemonDetail());

    expect(result.current.detail).toEqual(mockPokemonData);
  });

  it('should remove details param when closeDetail is called', () => {
    mockSearchParams.set('details', 'bulbasaur');
    mockSearchParams.set('page', '1');

    const { result } = renderHook(() => useFetchPokemonDetail());
    result.current.closeDetail();

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        get: expect.any(Function),
        delete: expect.any(Function),
      })
    );

    const passedParams = mockSetSearchParams.mock.calls[0][0];
    expect(passedParams.get('page')).toBe('1');
    expect(passedParams.get('details')).toBeNull();
  });
});
