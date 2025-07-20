import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getPokemons } from '../shared/api/get-pokemon';
import { getLineSearch } from '../shared/api/search-save';
import { mockPokemons } from '../shared/test-utils/mocks/pokemons';
import ErrorBoundary from './error-boundary';
import '@testing-library/jest-dom/vitest';
import App from './app';

vi.mock('../shared/api/get-pokemon');
vi.mock('../shared/api/search-save');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const mockConsoleError = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  describe('Initial Load', () => {
    it.each(['bulbasaur', ''])(
      'should load pokemons on mount with saved search',
      async (str) => {
        vi.mocked(getLineSearch).mockReturnValue(str);
        vi.mocked(getPokemons).mockResolvedValue(mockPokemons);

        render(<App />);

        await waitFor(() => {
          expect(getPokemons).toHaveBeenCalledWith(str);
        });
      }
    );
  });

  describe('Error Handling', () => {
    it('should handle error when button is clicked', async () => {
      vi.mocked(getLineSearch).mockReturnValue('');
      vi.mocked(getPokemons).mockResolvedValue(mockPokemons);

      render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );

      await userEvent.click(screen.getByText(/don t touch me/i));

      expect(mockConsoleError).toHaveBeenCalled();
      expect(
        screen.getByText('Error: Oooopss... this button is causing problems!')
      ).toBeInTheDocument();
    });
  });
});
