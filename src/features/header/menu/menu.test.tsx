import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/model/routes';
import Menu from './menu';

// Мокаем react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    NavLink: ({
      to,
      children,
      className,
    }: {
      to: string;
      children: React.ReactNode;
      className?: string | ((props: { isActive: boolean }) => string);
    }) => {
      const isActive =
        typeof className === 'function'
          ? className({ isActive: false })
          : className;
      return (
        <a href={to} className={isActive}>
          {children}
        </a>
      );
    },
  };
});

describe('Menu Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render all navigation links', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('About')).toHaveClass('menu__item');
  });

  it('should not apply active class when link is not active', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.POKEMONS]}>
        <Menu />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).not.toHaveClass('menu__item-active');
  });
});
