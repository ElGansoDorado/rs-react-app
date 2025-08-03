import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import BagList from './bag-list';
import { mockPokemons } from '../../../shared/test-utils/mocks/pokemons';

const mockBagState = {
  list: mockPokemons,
  removePokemon: vi.fn(),
  hasPokemon: vi.fn(),
  addPokemon: vi.fn(),
  clear: vi.fn(),
};

vi.mock('../../../shared/hooks/use-bag', () => ({
  useBag: vi.fn((selector) => selector(mockBagState)),
}));

describe('BagList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockBagState.list = [...mockPokemons];
    mockBagState.removePokemon.mockImplementation((name: string) => {
      mockBagState.list = mockBagState.list.filter((p) => p.name !== name);
    });
  });

  it('should render empty state when bag is empty', () => {
    mockBagState.list = [];
    render(<BagList />);

    expect(screen.getByText(/Your inventory is empty/i)).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('should render pokemon cards when bag is not empty', () => {
    render(<BagList />);

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('should call removePokemon when close button is clicked', () => {
    render(<BagList />);

    const closeButtons = screen.getAllByAltText('close card img');
    fireEvent.click(closeButtons[0]);

    expect(mockBagState.removePokemon).toHaveBeenCalledTimes(1);
    expect(mockBagState.removePokemon).toHaveBeenCalledWith('bulbasaur');
  });

  it('should display pokemon images', () => {
    render(<BagList />);

    const images = screen.getAllByRole('img', { name: /front img/ });
    expect(images[0]).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    );
  });
});
