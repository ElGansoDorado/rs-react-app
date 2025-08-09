import { renderHook, act } from '@testing-library/react';
import { usePagination } from './use-pagination';
import { useSearchParams } from 'react-router-dom';
import { describe, vi, it, expect, beforeEach, type Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

describe('usePagination Hook', () => {
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

  it('should initialize with page from URL if present', () => {
    mockSearchParams.set('page', '3');
    const { result } = renderHook(() => usePagination(10));

    expect(result.current.page).toBe(3);
    expect(result.current.max).toBe(10);
  });

  it('should increment page correctly with switchPage', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.switchPage(2));
    expect(result.current.page).toBe(3);
  });

  it('should not increment beyond max limit with switchPage', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.switchPage(10));
    expect(result.current.page).toBe(1);
  });

  it('should decrement page correctly with switchPage', () => {
    mockSearchParams.set('page', '3');
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.switchPage(-2));
    expect(result.current.page).toBe(1);
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' });
  });

  it('should not decrement below 1 with switchPage', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.switchPage(-5));
    expect(result.current.page).toBe(1);
  });

  it('should update page and URL when setPage is called', () => {
    const { result } = renderHook(() => usePagination(10));

    act(() => result.current.setPage(4));
    expect(result.current.page).toBe(4);
  });

  it('should respect max limit when setPage is called', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.switchPage(10));
    expect(result.current.page).toBe(1);
  });

  it('should not set page below 1 when setPage is called', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.switchPage(-2));
    expect(result.current.page).toBe(1);
  });

  it('should not update URL if page param was not initially present', () => {
    const { result } = renderHook(() => usePagination(5));

    act(() => result.current.setPage(3));
    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  it('should preserve existing search params when updating page', () => {
    mockSearchParams.set('filter', 'pokemon');
    mockSearchParams.set('page', '2');

    const { result } = renderHook(() => usePagination(10));

    act(() => result.current.setPage(3));
    expect(mockSetSearchParams).toHaveBeenCalledWith({
      filter: 'pokemon',
      page: '3',
    });
  });
});
