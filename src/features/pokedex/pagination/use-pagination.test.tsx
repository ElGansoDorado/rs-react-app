import { renderHook, act } from '@testing-library/react';
import { usePagination } from './use-pagination';
import { useSearchParams } from 'react-router-dom';
import { describe, vi, it, expect, beforeEach, type Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

describe('usePagination', () => {
  const mockSetSearchParams = vi.fn();
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  it('should initialize with page from URL or default to 1', () => {
    mockSearchParams.set('page', '3');
    const { result } = renderHook(() => usePagination(10));
    expect(result.current.page).toBe(3);
    expect(result.current.max).toBe(10);

    mockSearchParams.delete('page');
    const { result: result2 } = renderHook(() => usePagination(10));
    expect(result2.current.page).toBe(1);
    expect(result2.current.max).toBe(10);
  });

  it('should correctly handle page switching', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.switchPage(2));
    expect(result.current.page).toBe(3);
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3' });

    act(() => result.current.switchPage(10));
    expect(result.current.page).toBe(3);

    act(() => result.current.switchPage(-2));
    expect(result.current.page).toBe(1);
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' });

    act(() => result.current.switchPage(-5));
    expect(result.current.page).toBe(1);
  });

  it('should update URL when page changes', () => {
    const { result } = renderHook(() => usePagination(10));

    act(() => result.current.setPage(4));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '4' });

    act(() => result.current.setPage(2));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '2' });
  });

  it('should respect max limit when setting page directly', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.setPage(3));
    expect(result.current.page).toBe(3);

    act(() => result.current.setPage(10));
    expect(result.current.page).toBe(3);

    act(() => result.current.setPage(-2));
    expect(result.current.page).toBe(3);
  });
});
