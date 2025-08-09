import { describe, it, expect, vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { queryClient } from '@/shared/api/query-client';
import { useTheme } from '@/shared/hooks/use-theme';
import userEvent from '@testing-library/user-event';
import { useBag } from '@/shared/hooks/use-bag';
import App from './app';

vi.mock('@/features/header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/shared/hooks/use-theme', () => ({
  useTheme: vi.fn(() => ({ theme: 'light' })),
}));

vi.mock('@/shared/hooks/use-bag', () => ({
  useBag: vi.fn((selector) => selector({ list: [] })),
}));

vi.mock('@/shared/api/query-client', () => ({
  queryClient: {
    clear: vi.fn(),
  },
}));

describe('App Component', () => {
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

  it('should show modal with export controls when bag has items', () => {
    (vi.mocked(useBag) as Mock).mockImplementation((selector) =>
      selector({ list: Array(3).fill({}) })
    );

    render(<App />);

    expect(screen.getByText(`selected items: 3`)).toBeInTheDocument();
  });

  it('should call queryClient.clear when clear cache button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /clear cache/i }));
    expect(queryClient.clear).toHaveBeenCalledTimes(1);
  });
});
