import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './pagination';
import { usePagination } from './use-pagination';
import { describe, vi, it, expect, beforeEach, type Mock } from 'vitest';

vi.mock('./use-pagination', () => ({
  usePagination: vi.fn(),
}));

describe('Pagination', () => {
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
    expect(screen.getByText('<<')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('>>')).toBeInTheDocument();
  });

  it('should handle first page button click', () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={100} />);
    fireEvent.click(screen.getByText('<<'));

    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('should handle prev 10 pages button click', () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={100} />);
    fireEvent.click(screen.getByText('<'));

    expect(mockSwitchPage).toHaveBeenCalledWith(-10);
  });

  it('should handle next 10 pages button click', () => {
    render(<Pagination max={100} />);
    fireEvent.click(screen.getByText('>'));

    expect(mockSwitchPage).toHaveBeenCalledWith(10);
  });

  it('should handle last page button click', () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={100} />);
    fireEvent.click(screen.getByText('>>'));

    expect(mockSetPage).toHaveBeenCalledWith(100);
  });

  it('should handle input change with valid page number', () => {
    render(<Pagination max={100} />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '25' } });
    expect(mockSetPage).toHaveBeenCalledWith(25);
  });

  it('should handle input change with page number exceeding max', () => {
    render(<Pagination max={100} />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '150' } });
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

    expect(screen.getByText('<<')).toBeDisabled();
    expect(screen.getByText('<')).toBeDisabled();
    expect(screen.getByText('>')).not.toBeDisabled();
    expect(screen.getByText('>>')).not.toBeDisabled();

    (usePagination as Mock).mockReturnValue({
      page: 100,
      max: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    rerender(<Pagination max={100} />);

    expect(screen.getByText('<<')).not.toBeDisabled();
    expect(screen.getByText('<')).not.toBeDisabled();
    expect(screen.getByText('>')).toBeDisabled();
    expect(screen.getByText('>>')).toBeDisabled();
  });

  it('should disable forward buttons when max is less than 11', () => {
    (usePagination as Mock).mockReturnValue({
      page: 1,
      max: 5,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
    });

    render(<Pagination max={5} />);

    expect(screen.getByText('>')).toBeDisabled();
    expect(screen.getByText('>>')).toBeDisabled();
  });
});
