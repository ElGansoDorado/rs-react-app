import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { useTheme } from '@/shared/hooks/use-theme';
import Header from '.';

vi.mock('@/shared/hooks/use-theme', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  })),
}));

describe('Header', () => {
  const mockToggleTheme = vi.fn();

  it('should renders', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Pokemon list')).toBeInTheDocument();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('should display sun icon when theme is dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const icon = screen.getByRole('img', { name: /toggle theme img/i });
    expect(icon).toHaveAttribute(
      'src',
      'https://www.svgrepo.com/show/529971/sun-2.svg'
    );
  });
});
