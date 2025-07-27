import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app';

vi.mock('../features/header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

describe('App Component', () => {
  it('should render all main elements', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();

    expect(screen.getByTestId('outlet')).toBeInTheDocument();

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
    expect(screen.getByText('@2025 Yakovchik Denis')).toBeInTheDocument();
  });
});
