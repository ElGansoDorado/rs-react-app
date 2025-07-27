import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ROUTES } from '../../../shared/model/routes';
import Search from './search';

vi.mock('@/shared/hooks/useLineSearch', () => ({
  useLineSearch: vi.fn(() => ({
    searchLine: '',
    setSearchLine: vi.fn(),
  })),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Search Component', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });

  it('updates search input value when typing', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'pikachu');

    expect(input).toHaveValue('pikachu');
  });

  it('navigates to pokemons with search query when form is submitted', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'search' });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(
      `${ROUTES.POKEMONS}?search=pikachu`
    );
  });
});
