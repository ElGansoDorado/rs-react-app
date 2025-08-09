import { renderHook, act, fireEvent, render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLineSearch } from './use-line-search';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

describe('useLineSearch', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    localStorage.clear();
  });

  it('should be initialized with a value from localStorage', () => {
    localStorage.setItem('SEARCH', 'test-value');

    const { result } = renderHook(() => useLineSearch());

    expect(result.current.searchLine).toBe('test-value');
  });

  it('should be initialized to an empty string if there is no value in localStorage', () => {
    const { result } = renderHook(() => useLineSearch());
    expect(result.current.searchLine).toBe('');
  });

  it('should update localStorage when searchLine changes', () => {
    const { result } = renderHook(() => useLineSearch());

    act(() => {
      result.current.setSearchLine('new-value');
    });

    expect(result.current.searchLine).toBe('new-value');
    expect(localStorage.getItem('SEARCH')).toBe('new-value');
  });

  it('should work inside the component', () => {
    const TestComponent = () => {
      const { searchLine, setSearchLine } = useLineSearch();
      return (
        <div>
          <input
            value={searchLine}
            onChange={(e) => setSearchLine(e.target.value)}
            data-testid="search-input"
          />
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const input = getByTestId('search-input');

    act(() => {
      fireEvent.change(input, { target: { value: 'pikachu' } });
    });

    expect(localStorage.getItem('SEARCH')).toBe('pikachu');
  });
});
