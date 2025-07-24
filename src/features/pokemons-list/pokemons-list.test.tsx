import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { PokemonsList } from './pokemon-list.page';

describe('Pokemon list', () => {
  afterEach(() => {
    cleanup();
  });

  it('checks for missing data warning', () => {
    render(<PokemonsList />);
    expect(
      screen.getByText('Unfortunately, the search did not find anything')
    ).toBeInTheDocument();
  });

  it('checks for loader', () => {
    render(<PokemonsList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('checks if pokemon cards have loaded', () => {
    render(<PokemonsList />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
});
