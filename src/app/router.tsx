import { ROUTES } from '@/shared/model/routes';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { ThemeProvider } from '@/shared/hooks/use-theme';
import ErrorBoundary from './errors/error-boundary';
import ErrorPage from './errors/error-page';
import { Provider } from './providers';
import App from './app';

export const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Provider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.POKEMONS,
        lazy: () => import('@/features/pokedex/pokedex.page'),
      },
      {
        path: ROUTES.BAG,
        lazy: () => import('@/features/bag/bag.page'),
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

  return redirect(`${ROUTES.POKEMONS}?page=1`);
}
