import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  setLineSearch,
  checkLineSearchSave,
  getLineSearch,
} from './search-save';

describe('LocalStorage utilities', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('setLineSearch', () => {
    it.each(['pikachu', ''])('should save the resulting string', (string) => {
      setLineSearch(string);

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('SEARCH', string);
    });
  });

  describe('checkLineSearchSave', () => {
    it('should return true when saved value matches input', () => {
      const testSearch = 'charizard';
      localStorageMock.getItem.mockReturnValue(testSearch);

      const result = checkLineSearchSave(testSearch);

      expect(result).toBe(true);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('SEARCH');
    });
  });

  describe('getLineSearch', () => {
    it('should return saved search string', () => {
      const testSearch = 'mewtwo';
      localStorageMock.getItem.mockReturnValue(testSearch);

      const result = getLineSearch();

      expect(result).toBe(testSearch);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('SEARCH');
    });

    it.each([null, undefined])(
      'should return empty string when nothing is saved',
      (value) => {
        localStorageMock.getItem.mockReturnValue(value);

        const result = getLineSearch();

        expect(result).toBe('');
      }
    );
  });
});
