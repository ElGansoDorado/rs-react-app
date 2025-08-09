import { describe, vi, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetail from './pokemon-detail';
import { mockPokemons } from '@/shared/test-utils/mocks/pokemons';
import {
  mockCloseDetail,
  mockUseFetchPokemonDetail,
  mockUseBag,
} from '@/shared/test-utils/mocks/hooks';
import { useFetchPokemonDetail } from './queries';
import { useBag } from '@/shared/hooks/use-bag';

vi.mock('@/shared/hooks/use-bag');
vi.mock('./queries', () => ({
  useFetchPokemonDetail: vi.fn(() => mockUseFetchPokemonDetail()),
}));

describe('PokemonDetail Component', () => {
  const user = userEvent.setup();
  const mockPokemonDetail = mockPokemons[0];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useBag).mockImplementation((selector) => selector(mockUseBag));
    mockUseBag.list = [];
  });

  it('should render loader when loading', () => {
    vi.mocked(useFetchPokemonDetail).mockReturnValue(
      mockUseFetchPokemonDetail({ isLoading: true, detail: null })
    );

    render(<PokemonDetail />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    vi.mocked(useFetchPokemonDetail).mockReturnValue(
      mockUseFetchPokemonDetail({ isError: true, detail: null })
    );

    render(<PokemonDetail />);
    expect(
      screen.getByText(/Pokemon details were not found/i)
    ).toBeInTheDocument();
  });

  it('should render pokemon details correctly', () => {
    vi.mocked(useFetchPokemonDetail).mockReturnValue(
      mockUseFetchPokemonDetail()
    );

    render(<PokemonDetail />);

    expect(screen.getByText(mockPokemonDetail.name)).toBeInTheDocument();
    expect(screen.getByText(mockPokemonDetail.id)).toBeInTheDocument();
    expect(
      screen.getByText(mockPokemonDetail.types[0].type.name)
    ).toBeInTheDocument();

    const image = screen.getByRole('img', { name: mockPokemonDetail.name });
    expect(image).toHaveAttribute(
      'src',
      mockPokemonDetail.sprites.front_default
    );

    mockPokemonDetail.stats.forEach((stat) => {
      expect(
        screen.getByText(`${stat.stat.name}: ${stat.base_stat}`)
      ).toBeInTheDocument();
    });
  });

  it('should call closeDetail when close button is clicked', async () => {
    render(<PokemonDetail />);
    await user.click(screen.getByRole('close'));
    expect(mockCloseDetail).toHaveBeenCalledTimes(1);
  });

  it('should add pokemon to bag when add button is clicked', async () => {
    render(<PokemonDetail />);
    await user.click(screen.getByRole('add'));
    expect(mockUseBag.addPokemon).toHaveBeenCalledTimes(1);
    expect(mockUseBag.addPokemon).toHaveBeenCalledWith(mockPokemonDetail);
  });

  it('should show correct bag icon based on pokemon presence in bag', () => {
    mockUseBag.list = [];
    const { rerender } = render(<PokemonDetail />);
    const addButton = screen.getByRole('add');

    expect(addButton.querySelector('img')).toHaveAttribute(
      'src',
      'https://www.svgrepo.com/show/525643/bag-2.svg'
    );

    mockUseBag.list = [mockPokemonDetail];
    rerender(<PokemonDetail />);
    expect(addButton.querySelector('img')).toHaveAttribute(
      'src',
      'https://www.svgrepo.com/show/525648/bag-cross.svg'
    );
  });
});
