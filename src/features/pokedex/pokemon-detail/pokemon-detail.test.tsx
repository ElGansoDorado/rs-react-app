import '@testing-library/jest-dom/vitest';
import {
  describe,
  vi,
  it,
  expect,
  beforeEach,
  type Mock,
  afterEach,
} from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import PokemonDetail from './pokemon-detail';
import { mockPokemons } from '../../../shared/test-utils/mocks/pokemons';
import { usePokemonDetail } from './use-pokemon-detail';

vi.mock('./use-pokemon-detail', () => ({
  usePokemonDetail: vi.fn(),
}));

vi.mock('..', () => ({
  Loader: () => <div>Loader...</div>,
}));

describe('PokemonDetail', () => {
  const mockCloseDetail = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should not render when detail is null', () => {
    (usePokemonDetail as Mock).mockReturnValue({
      detail: null,
      isLoading: false,
      closeDetail: mockCloseDetail,
    });

    const { container } = render(<PokemonDetail />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render Loader when isLoading is true', () => {
    (usePokemonDetail as Mock).mockReturnValue({
      detail: null,
      isLoading: true,
      closeDetail: mockCloseDetail,
    });

    render(<PokemonDetail />);
    expect(screen.getByText('Loader...')).toBeInTheDocument();
  });

  it('should render pokemon details when detail exists', () => {
    (usePokemonDetail as Mock).mockReturnValue({
      detail: mockPokemons[0],
      isLoading: false,
      closeDetail: mockCloseDetail,
    });

    render(<PokemonDetail />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockPokemons[0].sprites.front_default
    );

    expect(screen.getByText('hp: 45')).toBeInTheDocument();
    expect(screen.getByText('attack: 49')).toBeInTheDocument();
    expect(screen.getByText('defense: 49')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();
  });

  it('should call closeDetail when X button is clicked', () => {
    (usePokemonDetail as Mock).mockReturnValue({
      detail: mockPokemons[0],
      isLoading: false,
      closeDetail: mockCloseDetail,
    });

    render(<PokemonDetail />);
    fireEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(mockCloseDetail).toHaveBeenCalledTimes(1);
  });

  it('should disappear after closeDetail is called', () => {
    const { rerender } = render(<PokemonDetail />);

    (usePokemonDetail as Mock).mockReturnValue({
      detail: mockPokemons[0],
      isLoading: false,
      closeDetail: () => {},
    });
    rerender(<PokemonDetail />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'X' }));

    (usePokemonDetail as Mock).mockReturnValue({
      detail: null,
      isLoading: false,
      closeDetail: () => {},
    });
    rerender(<PokemonDetail />);
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });
});
