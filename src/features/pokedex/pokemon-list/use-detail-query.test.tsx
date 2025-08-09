import { renderHook } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDetailQuery } from './use-detail-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('useDetailQuery hook', () => {
  const mockNavigate = vi.fn();
  const mockSetSearchParams = vi.fn();
  let mockSearchParams: URLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useSearchParams).mockImplementation(() => [
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  it('should return empty detailsQuery when no params', () => {
    const { result } = renderHook(() => useDetailQuery());
    expect(result.current.detailsQuery).toBe('');
  });

  it('should return detailsQuery when params exist', () => {
    mockSearchParams.set('details', 'pikachu');

    const { result } = renderHook(() => useDetailQuery());
    expect(result.current.detailsQuery).toBe('pikachu');
  });

  it('should remove details param when handlePokemonClick called with same id', () => {
    mockSearchParams.set('details', 'pikachu');

    const { result } = renderHook(() => useDetailQuery());
    result.current.handlePokemonClick('pikachu');

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        get: expect.any(Function),
        delete: expect.any(Function),
      })
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should preserve other search params when updating details', () => {
    mockSearchParams.set('page', '2');

    const { result } = renderHook(() => useDetailQuery());
    result.current.handlePokemonClick('bulbasaur');

    const lastCall = mockNavigate.mock.calls[0][0];
    expect(lastCall).toContain('page=2');
    expect(lastCall).toContain('details=bulbasaur');
  });
});
