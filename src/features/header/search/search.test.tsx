import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './search';

describe('Pokemon search', () => {
  const mockSearchPokemons = vi.fn();

  afterEach(() => {
    cleanup();
  });

  it.each(['first test', '     second test     '])(
    'should handle input changes correctly',
    (str) => {
      render(<Search />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: str } });

      expect(input).toHaveValue(str.trim());
    }
  );

  it('should search for pokemon when submitting form', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, 'pikachu');
    await userEvent.click(screen.getByRole('button', { name: 'search' }));

    expect(mockSearchPokemons).toHaveBeenCalledTimes(1);
    expect(mockSearchPokemons).toHaveBeenCalledWith('pikachu');
  });
});
