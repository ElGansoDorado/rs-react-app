import { ROUTES } from '@/shared/model/routes';
import { createBrowserRouter, redirect } from 'react-router-dom';
import ErrorBoundary from './error-boundary';
import App from './app';

export const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTES.POKEMONS,
        lazy: () => import('@/features/pokemons-list/pokemon-list.page'),
      },
      {
        path: ROUTES.ABOUT,
        lazy: () => import('@/features/pokemons-list/pokemon-list.page'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.ABOUT),
      },
    ],
  },
]);
