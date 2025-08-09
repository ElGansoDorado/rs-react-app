import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './pagination';
import { usePagination } from './use-pagination';
import { describe, vi, it, expect, beforeEach, type Mock } from 'vitest';

vi.mock('./use-pagination', () => ({
  usePagination: vi.fn(),
}));

describe('Pagination Component', () => {
  const user = userEvent.setup();
  const mockSetPage = vi.fn();
  const mockSwitchPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (usePagination as Mock).mockReturnValue({
      page: 1,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });
  });

  it('should render pagination controls', () => {
    render(<Pagination max={100} />);

    expect(screen.getByRole('pagination')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
    expect(screen.getByRole('button', { name: '<<' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '<' })).toBeInTheDocument();
  });

  it('should handle first page button click', async () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={100} />);
    await user.click(screen.getByRole('button', { name: '<<' }));

    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('should handle prev 10 pages button click', async () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={100} />);
    await user.click(screen.getByRole('button', { name: '<' }));

    expect(mockSwitchPage).toHaveBeenCalledWith(-10);
  });

  it('should handle next 10 pages button click', async () => {
    render(<Pagination max={100} />);
    await user.click(screen.getByRole('button', { name: '>' }));

    expect(mockSwitchPage).toHaveBeenCalledWith(10);
  });

  it('should handle last page button click', async () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={100} />);
    await user.click(screen.getByRole('button', { name: '>>' }));

    expect(mockSetPage).toHaveBeenCalledWith(100);
  });

  it('should disable navigation buttons when on boundaries', () => {
    (usePagination as Mock).mockReturnValue({
      page: 1,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    const { rerender } = render(<Pagination max={100} />);

    expect(screen.getByRole('button', { name: '<<' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '<' })).toBeDisabled();

    (usePagination as Mock).mockReturnValue({
      page: 100,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    rerender(<Pagination max={100} />);

    expect(screen.getByRole('button', { name: '<<' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: '<' })).not.toBeDisabled();
  });

  it('should disable forward buttons when max is less than 11', () => {
    (usePagination as Mock).mockReturnValue({
      page: 1,
      max: 5,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={5} />);

    expect(screen.getByRole('button', { name: '>' })).toBeDisabled();
  });
});
