import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { mockPokemons } from '@/shared/test-utils/mocks/pokemons';
import { mockUseBag } from '@/shared/test-utils/mocks/hooks';
import BagList from './bag-list';

vi.mock('@/shared/hooks/use-bag', () => ({
  useBag: vi.fn((selector) => selector(mockUseBag)),
}));

describe('BagList Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBag.list = [...mockPokemons];
    mockUseBag.removePokemon.mockImplementation((name: string) => {
      mockUseBag.list = mockUseBag.list.filter((p) => p.name !== name);
    });
  });

  it('should render empty state when bag is empty', () => {
    mockUseBag.list = [];
    render(<BagList />);

    expect(
      screen.getByText(
        /Your inventory is empty, it s time to catch new Pokemon!/i
      )
    ).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('should render pokemon cards when bag is not empty', () => {
    render(<BagList />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(mockPokemons.length);
    expect(screen.getByText(mockPokemons[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockPokemons[1].name)).toBeInTheDocument();
  });

  it('should call removePokemon when close button is clicked', async () => {
    render(<BagList />);

    const closeButtons = screen.getAllByRole('button', { name: /close card/i });
    await user.click(closeButtons[0]);

    expect(mockUseBag.removePokemon).toHaveBeenCalledTimes(1);
    expect(mockUseBag.removePokemon).toHaveBeenCalledWith(mockPokemons[0].name);
  });

  it('should display pokemon images with correct attributes', () => {
    render(<BagList />);

    const images = screen.getAllByRole('img', { name: /front img/i });
    expect(images).toHaveLength(mockPokemons.length);

    mockPokemons.forEach((pokemon, index) => {
      expect(images[index]).toHaveAttribute(
        'src',
        pokemon.sprites.front_default
      );
      expect(images[index]).toHaveAttribute('alt', `front img ${pokemon.name}`);
    });
  });
});
