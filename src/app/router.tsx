import { ROUTES } from '@/shared/model/routes';
import { createBrowserRouter, redirect } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import ErrorPage from './error-page';
import App from './app';

export const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.POKEMONS,
        lazy: () => import('@/features/pokedex/pokedex.page'),
      },
      {
        path: ROUTES.ABOUT,
        lazy: () => import('@/features/about/about.page'),
      },
      {
        path: ROUTES.HOME,
        loader: pokemonsLoader,
      },
    ],
  },
]);

function pokemonsLoader() {
  const savedSearch = localStorage.getItem('SEARCH');

  if (savedSearch && savedSearch.trim() !== '') {
    return redirect(
      `${ROUTES.POKEMONS}?search=${encodeURIComponent(savedSearch)}`
    );
  }

  return redirect(`${ROUTES.POKEMONS}/?page=1`);
}
