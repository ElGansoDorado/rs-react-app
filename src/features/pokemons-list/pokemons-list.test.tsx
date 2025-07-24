import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { mockPokemons } from '../../shared/test-utils/mocks/pokemons';
import PokemonsList from '.';

describe('Pokemon list', () => {
  afterEach(() => {
    cleanup();
  });

  it('checks for missing data warning', () => {
    render(<PokemonsList pokemonsList={[]} isLoading={false} />);
    expect(
      screen.getByText('Unfortunately, the search did not find anything')
    ).toBeInTheDocument();
  });

  it('checks for loader', () => {
    render(<PokemonsList pokemonsList={[]} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('checks if pokemon cards have loaded', () => {
    render(<PokemonsList pokemonsList={mockPokemons} isLoading={false} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
});
