import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach, type Mock } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { useTheme } from '../shared/hooks/use-theme';
import App from './app';

vi.mock('../features/header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('../shared/hooks/use-theme', () => ({
  useTheme: vi.fn(() => ({ theme: 'light' })),
}));

describe('App Component', () => {
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
});
