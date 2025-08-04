import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockPokemonsArray } from '@/shared/test-utils/mocks/pokemons';
import { usePokemonList } from './use-pokemon-list';
import PokemonList from './pokemons-list';

vi.mock('./use-pokemon-list');
vi.mock('react-router-dom');
vi.mock('../Loader', () => ({
  default: () => <div data-testid="loader">loader</div>,
}));
vi.mock('../Card', () => ({
  default: ({ name, showDetail }: { name: string; showDetail: () => void }) => (
    <li className="container" data-testid="pokemon-card" onClick={showDetail}>
      <p>current</p>
      <h3>{name}</h3>
    </li>
  ),
}));

describe('PokemonList', () => {
  const mockSetSearchParams = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render loader when loading', () => {
    vi.mocked(usePokemonList).mockReturnValue({
      pokemonsList: [],
      isLoading: true,
    });

    render(<PokemonList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render all pokemons when loaded', () => {
    vi.mocked(usePokemonList).mockReturnValue({
      pokemonsList: mockPokemonsArray,
      isLoading: false,
    });

    render(<PokemonList />);
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(mockPokemonsArray.length);
    mockPokemonsArray.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  it('should render single pokemon when search returns one result', () => {
    vi.mocked(usePokemonList).mockReturnValue({
      pokemonsList: [mockPokemonsArray[0]],
      isLoading: false,
    });

    render(<PokemonList />);
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(1);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('should show "not found" message when no pokemons', () => {
    vi.mocked(usePokemonList).mockReturnValue({
      pokemonsList: [],
      isLoading: false,
    });

    render(<PokemonList />);
    expect(
      screen.getByText('Unfortunately, the search did not find anything')
    ).toBeInTheDocument();
  });

  it('should handle pokemon card click', () => {
    vi.mocked(usePokemonList).mockReturnValue({
      pokemonsList: mockPokemonsArray,
      isLoading: false,
    });

    render(<PokemonList />);
    const firstCard = screen.getAllByTestId('pokemon-card')[0];
    fireEvent.click(firstCard);

    expect(mockNavigate).toHaveBeenCalledWith('?details=pikachu');
  });

  it('should remove details param when clicking active card', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('details=pikachu'),
      mockSetSearchParams,
    ]);

    vi.mocked(usePokemonList).mockReturnValue({
      pokemonsList: mockPokemonsArray,
      isLoading: false,
    });

    render(<PokemonList />);
    const firstCard = screen.getAllByTestId('pokemon-card')[0];
    fireEvent.click(firstCard);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.objectContaining({
        get: expect.any(Function),
        delete: expect.any(Function),
      })
    );
  });
});
