import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PokemonList from './pokemons-list';
import { useDetailQuery } from './use-detail-query';
import {
  mockPokemons,
  mockPokemonsArray,
} from '@/shared/test-utils/mocks/pokemons';
import { mockUseBag } from '@/shared/test-utils/mocks/hooks';

vi.mock('react-router-dom');
vi.mock('./use-detail-query');
vi.mock('@/shared/hooks/use-bag', () => ({
  useBag: vi.fn((selector) => selector(mockUseBag)),
}));

describe('PokemonList Component', () => {
  const user = userEvent.setup();
  const mockSetSearchParams = vi.fn();
  const mockNavigate = vi.fn();
  const mockHandlePokemonClick = vi.fn();
  mockUseBag.list = mockPokemons;

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useDetailQuery).mockReturnValue({
      detailsQuery: '',
      handlePokemonClick: mockHandlePokemonClick,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockUseBag.list = [];
  });

  it('should render "not found" message when no pokemons', () => {
    render(<PokemonList pokemons={[]} />);
    expect(
      screen.getByText('Unfortunately, the search did not find anything')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('pokemon-card')).not.toBeInTheDocument();
  });

  it('should render all pokemons when provided', () => {
    render(<PokemonList pokemons={mockPokemonsArray} />);
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(mockPokemonsArray.length);
    mockPokemonsArray.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  it('should call handlePokemonClick when card is clicked', async () => {
    render(<PokemonList pokemons={mockPokemonsArray} />);
    const firstCard = screen.getAllByTestId('pokemon-card')[0];
    await user.click(firstCard);
    expect(mockHandlePokemonClick).toHaveBeenCalledWith(
      mockPokemonsArray[0].name
    );
  });

  it('should show in-bag badge when pokemon is in bag', () => {
    mockUseBag.list = [mockPokemons[0]];
    render(<PokemonList pokemons={mockPokemonsArray} />);

    const bagIcons = screen.getAllByAltText('bag icon');
    expect(bagIcons.length).toBeGreaterThan(0);

    expect(bagIcons[0]).toBeInTheDocument();
  });
});
