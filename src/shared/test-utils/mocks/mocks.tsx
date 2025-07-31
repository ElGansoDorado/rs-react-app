import { vi } from 'vitest';

export const setupUsePokemonsListMocks = () => {
  vi.mock('react-router-dom', () => ({
    useSearchParams: vi.fn(),
  }));

  vi.mock('../../../shared/api/get-pokemon', () => ({
    getPokemon: vi.fn(),
    getPokemonPage: vi.fn(),
  }));

  vi.mock('../../../shared/hooks/use-line-search', () => ({
    useLineSearch: vi.fn(),
  }));
};

export const setupPokemonsListMocks = () => {
  vi.mock('./use-pokemon-list');
  vi.mock('react-router-dom');
  vi.mock('../Loader', () => ({
    default: () => <div data-testid="loader">loader</div>,
  }));
  vi.mock('../Card', () => ({
    default: ({
      name,
      showDetail,
    }: {
      name: string;
      showDetail: () => void;
    }) => (
      <li className="container" data-testid="pokemon-card" onClick={showDetail}>
        <p>current</p>
        <h3>{name}</h3>
      </li>
    ),
  }));
};
