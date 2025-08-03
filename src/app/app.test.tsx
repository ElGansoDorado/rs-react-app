import '@testing-library/jest-dom/vitest';
import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeEach,
  type Mock,
} from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from './theme-context';
import ErrorBoundary from './error-boundary';
import ErrorPage from './error-page';
import App from './app';
import { MemoryRouter, useNavigate } from 'react-router-dom';

vi.mock('../features/header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('./theme-context', () => ({
  useTheme: vi.fn(() => ({ theme: 'light' })),
}));

const BuggyComponent = () => {
  throw new Error('Test error');
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('App Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render all main elements', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
    expect(screen.getByText('@2025 Yakovchik Denis')).toBeInTheDocument();
  });

  it.each(['light', 'dark'])(
    'should apply theme class when theme is light',
    (testTheme) => {
      (vi.mocked(useTheme) as Mock).mockReturnValue({
        theme: testTheme,
      });

      const { container } = render(<App />);
      expect(container.firstChild).toHaveClass(testTheme);
    }
  );

  it('should display error message when child component throws error', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reload page/i })
    ).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });

  it('should call navigate with "/" when button is clicked', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /back to project/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
