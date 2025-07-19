import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './search';

describe('Pokemon search', () => {
  const mockSearchPokemons = vi.fn();

  beforeEach(() => {
    mockSearchPokemons.mockClear();
  });

  it('handles input changes correctly', () => {
    render(<Search searchPokemons={mockSearchPokemons} />);
    const input = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: 'first test search' } });
    expect(input).toHaveValue('first test search');

    fireEvent.change(input, {
      target: { value: '     second test search     ' },
    });
    expect(input).toHaveValue('second test search');

    fireEvent.change(input, { target: { value: '' } });
  });

  it('search for pokemon when submitting form', async () => {
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, 'pikachu');
    await userEvent.click(screen.getByRole('button', { name: 'search' }));

    expect(mockSearchPokemons).toHaveBeenCalledTimes(1);
    expect(mockSearchPokemons).toHaveBeenCalledWith('pikachu');
  });
});
