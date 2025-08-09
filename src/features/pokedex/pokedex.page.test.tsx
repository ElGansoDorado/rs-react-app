import { render, screen, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useFetchPokemonList } from './queries';
import { Pokedex } from './pokedex.page';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import { mockPokemonsArray } from '@/shared/test-utils/mocks/pokemons';
import type { PokemonPath } from '@/shared/model/pokemon.type';

vi.mock('react-router-dom');
vi.mock('./queries');
vi.mock('.', () => ({
  PokemonList: ({ pokemons }: { pokemons: PokemonPath[] }) => (
    <div data-testid="pokemon-list">{pokemons.length} pokemons</div>
  ),
  PokemonDetail: () => <div data-testid="pokemon-detail">Detail</div>,
  Pagination: ({ max }: { max: number }) => (
    <div data-testid="pagination">Max: {max}</div>
  ),
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

describe('Pokedex Component', () => {
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchParams as Mock).mockReturnValue([mockSearchParams]);
    vi.mocked(useFetchPokemonList).mockReturnValue({
      data: { list: [], page: 1 },
      isLoading: false,
      isError: false,
    });
  });

  it('should render title and container', () => {
    render(<Pokedex />);

    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('container');
  });

  it('should render loader when loading', () => {
    vi.mocked(useFetchPokemonList).mockReturnValue({
      data: { list: [], page: 1 },
      isLoading: true,
      isError: false,
    });

    render(<Pokedex />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('pokemon-list')).not.toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    vi.mocked(useFetchPokemonList).mockReturnValue({
      data: { list: [], page: 1 },
      isLoading: false,
      isError: true,
    });

    render(<Pokedex />);

    expect(screen.getByText(/Oooopsss/)).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should render PokemonList with data', async () => {
    vi.mocked(useFetchPokemonList).mockReturnValue({
      data: {
        list: mockPokemonsArray,
        page: 3,
      },
      isLoading: false,
      isError: false,
    });

    render(<Pokedex />);

    await waitFor(() => {
      expect(screen.getByTestId('pokemon-list')).toHaveTextContent(
        '3 pokemons'
      );
    });
  });

  it('should render Pagination when page param exists', () => {
    mockSearchParams.set('page', '2');
    vi.mocked(useFetchPokemonList).mockReturnValue({
      data: { list: [], page: 5 },
      isLoading: false,
      isError: false,
    });

    render(<Pokedex />);

    expect(screen.getByTestId('pagination')).toHaveTextContent('Max: 5');
  });

  it('should not render Pagination without page param', () => {
    mockSearchParams.delete('page');
    render(<Pokedex />);

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('should render PokemonDetail when details param exists', () => {
    mockSearchParams.set('details', 'pikachu');
    render(<Pokedex />);

    expect(screen.getByTestId('pokemon-detail')).toBeInTheDocument();
  });

  it('should not render PokemonDetail without details param', () => {
    mockSearchParams.delete('details');
    render(<Pokedex />);

    expect(screen.queryByTestId('pokemon-detail')).not.toBeInTheDocument();
  });

  it('should match snapshot in default state', () => {
    const { container } = render(<Pokedex />);
    expect(container).toMatchSnapshot();
  });
});
