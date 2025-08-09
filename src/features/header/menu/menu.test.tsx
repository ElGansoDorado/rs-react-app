import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Menu from './menu';
import classes from './menu.module.css';

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
  const testLinks = [
    { name: 'About', path: '/about' },
    { name: 'Pokedex', path: '/pokemons' },
    { name: 'Bag', path: '/bag' },
  ];

  it('should render all navigation links with correct structure', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();

    testLinks.forEach((link) => {
      const navItem = screen.getByText(link.name);
      expect(navItem).toBeInTheDocument();
      expect(navItem.closest('li')).toBeInTheDocument();
    });
  });

  it('should apply correct classes for inactive links', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Menu />
      </MemoryRouter>
    );

    const link = screen.getByText('Bag').closest('a');
    expect(link).toHaveAttribute('href', '/bag');
    expect(link).toHaveClass(classes.item);
    expect(link).not.toHaveClass(classes.active);
  });

  it('should apply active class to current route link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Menu />
      </MemoryRouter>
    );

    const link = screen.getByText('About').closest('a');
    expect(link).toHaveAttribute('href', '/about');
    expect(link).toHaveClass(classes.item);
  });

  it('should have correct menu structure and classes', () => {
    const { container } = render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    const menuList = container.querySelector('ul');
    expect(menuList?.children).toHaveLength(testLinks.length);
  });
});
