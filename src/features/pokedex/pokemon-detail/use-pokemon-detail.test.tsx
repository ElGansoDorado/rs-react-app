import { renderHook, act } from '@testing-library/react';
import { usePokemonDetail } from './use-pokemon-detail';
import { useSearchParams } from 'react-router-dom';
import { getPokemonDetail } from '@/shared/api/get-pokemon';
import {
  describe,
  vi,
  it,
  beforeEach,
  expect,
  beforeAll,
  afterAll,
  type Mock,
} from 'vitest';
import { mockPokemons } from '@/shared/test-utils/mocks/pokemons';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/shared/api/get-pokemon', () => ({
  getPokemonDetail: vi.fn(),
}));

describe('usePokemonDetail', () => {
  const mockSetSearchParams = vi.fn();
  const mockGet = vi.fn();

  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useSearchParams as Mock).mockReturnValue([
      { get: mockGet },
      mockSetSearchParams,
    ]);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should initialize with null detail when no details param', () => {
    mockGet.mockReturnValue(null);

    const { result } = renderHook(() => usePokemonDetail());

    expect(result.current.detail).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should fetch pokemon detail when details param exists', async () => {
    mockGet.mockReturnValue('bulbasaur');
    (getPokemonDetail as Mock).mockResolvedValue(mockPokemons[0]);

    const { result } = renderHook(() => usePokemonDetail());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      vi.runAllTimers();
    });

    expect(getPokemonDetail).toHaveBeenCalledWith('bulbasaur');
    expect(result.current.detail).toEqual(mockPokemons[0]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle fetch error gracefully', async () => {
    mockGet.mockReturnValue('bulbasaur');
    (getPokemonDetail as Mock).mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => usePokemonDetail());

    await act(async () => {
      vi.runAllTimers();
    });

    expect(result.current.detail).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should call setSearchParams without details parameter', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('details=bulbasaur'),
      mockSetSearchParams,
    ]);

    const { result } = renderHook(() => usePokemonDetail());

    act(() => {
      result.current.closeDetail();
    });

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const [actualParams] = mockSetSearchParams.mock.calls[0];

    expect(actualParams).toBeInstanceOf(URLSearchParams);
    expect(actualParams.get('details')).toBeNull();
  });

  it('should not fetch when details param is empty', () => {
    mockGet.mockReturnValue('');

    const { result } = renderHook(() => usePokemonDetail());

    expect(getPokemonDetail).not.toHaveBeenCalled();
    expect(result.current.detail).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
