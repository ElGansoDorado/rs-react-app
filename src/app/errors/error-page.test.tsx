import {
  isRouteErrorResponse,
  MemoryRouter,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorPage from './error-page';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
  };
});

describe('ErrorPage Component', () => {
  const mockNavigate = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should render error page with status and message', () => {
    const mockError = {
      status: 404,
      data: 'Page not found',
    };

    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Error Page')).toBeInTheDocument();
    expect(screen.getByText('404 | Page not found')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /back to project/i })
    ).toBeInTheDocument();
  });

  it('should call navigate with "/" when button is clicked', async () => {
    const mockError = {
      status: 500,
      data: 'Internal server error',
    };

    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /back to project/i });
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should throw error when not a route error response', () => {
    const mockError = {
      data: 'Some unexpected error',
    };

    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    expect(() =>
      render(
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      )
    ).toThrow('Some unexpected error');
  });
});
