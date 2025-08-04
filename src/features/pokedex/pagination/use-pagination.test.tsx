import { renderHook, act } from '@testing-library/react';
import { usePagination } from './use-pagination';
import { useSearchParams } from 'react-router-dom';
import { getPokemonNumberPage } from '@/shared/api/get-pokemon';
import {
  describe,
  vi,
  it,
  expect,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/shared/api/get-pokemon', () => ({
  getPokemonNumberPage: vi.fn(),
}));

describe('usePagination', () => {
  const mockSetSearchParams = vi.fn();
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    mockSearchParams = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with page from URL or default to 1', () => {
    mockSearchParams.set('page', '3');
    const { result } = renderHook(() => usePagination());
    expect(result.current.page).toBe(3);

    mockSearchParams.delete('page');
    const { result: result2 } = renderHook(() => usePagination());
    expect(result2.current.page).toBe(1);
    expect(result2.current.hasPageParam).toBe(true);
  });

  it('should correctly handle page switching', async () => {
    mockSearchParams.set('page', '2');
    (getPokemonNumberPage as Mock).mockResolvedValue(5);

    const { result } = renderHook(() => usePagination());
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    act(() => result.current.switchPage(2));
    expect(result.current.page).toBe(4);

    act(() => result.current.switchPage(10));
    expect(result.current.page).toBe(4);

    act(() => result.current.setPage(1));
    act(() => result.current.switchPage(-5));
    expect(result.current.page).toBe(1);
  });

  it('should fetch and set maxPage correctly', async () => {
    mockSearchParams.set('page', '1');
    (getPokemonNumberPage as Mock).mockResolvedValue(42);

    const { result } = renderHook(() => usePagination());
    expect(result.current.maxPage).toBe(0);

    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(result.current.maxPage).toBe(42);
  });

  it('should use fallback maxPage on API error', async () => {
    mockSearchParams.set('page', '1');
    (getPokemonNumberPage as Mock).mockRejectedValue(new Error('API error'));

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => usePagination());
    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.maxPage).toBe(66);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Failed to fetch max page:',
      expect.any(Error)
    );

    consoleErrorMock.mockRestore();
  });
});
