import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Pokedex } from './pokedex.page';

describe('Pokemon list', () => {
  afterEach(() => {
    cleanup();
  });

  it('checks for missing data warning', () => {
    render(<Pokedex />);
    expect(
      screen.getByText('Unfortunately, the search did not find anything')
    ).toBeInTheDocument();
  });

  it('checks for loader', () => {
    render(<Pokedex />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('checks if pokemon cards have loaded', () => {
    render(<Pokedex />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
});
