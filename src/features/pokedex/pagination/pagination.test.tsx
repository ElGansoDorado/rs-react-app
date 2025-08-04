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
      maxPage: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
      hasPageParam: false,
    });
  });

  it('should not render when hasPageParam is true', () => {
    (usePagination as Mock).mockReturnValue({
      hasPageParam: true,
    });

    const { container } = render(<Pagination />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render pagination controls', () => {
    render(<Pagination />);

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
      maxPage: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
      hasPageParam: false,
    });

    render(<Pagination />);
    fireEvent.click(screen.getByText('<<'));

    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('should handle prev 10 pages button click', () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      maxPage: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
      hasPageParam: false,
    });

    render(<Pagination />);
    fireEvent.click(screen.getByText('<'));

    expect(mockSwitchPage).toHaveBeenCalledWith(-10);
  });

  it('should handle next 10 pages button click', () => {
    render(<Pagination />);
    fireEvent.click(screen.getByText('>'));

    expect(mockSwitchPage).toHaveBeenCalledWith(10);
  });

  it('should handle last page button click', () => {
    (usePagination as Mock).mockReturnValue({
      page: 50,
      maxPage: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
      hasPageParam: false,
    });

    render(<Pagination />);
    fireEvent.click(screen.getByText('>>'));

    expect(mockSetPage).toHaveBeenCalledWith(100);
  });

  it('should handle input change with valid page number', () => {
    render(<Pagination />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '25' } });
    expect(mockSetPage).toHaveBeenCalledWith(25);
  });

  it('should handle input change with page number exceeding maxPage', () => {
    (usePagination as Mock).mockReturnValue({
      page: 1,
      maxPage: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
      hasPageParam: false,
    });

    render(<Pagination />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '150' } });
    expect(mockSetPage).toHaveBeenCalledWith(100);
  });

  it('should disable navigation buttons when on boundaries', () => {
    (usePagination as Mock).mockReturnValue({
      page: 1,
      maxPage: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
      hasPageParam: false,
    });

    const { rerender } = render(<Pagination />);

    expect(screen.getByText('<<')).toBeDisabled();
    expect(screen.getByText('<')).toBeDisabled();
    expect(screen.getByText('>')).not.toBeDisabled();
    expect(screen.getByText('>>')).not.toBeDisabled();

    (usePagination as Mock).mockReturnValue({
      page: 100,
      maxPage: 100,
      setPage: mockSetPage,
      switchPage: mockSwitchPage,
      hasPageParam: false,
    });

    rerender(<Pagination />);

    expect(screen.getByText('<<')).not.toBeDisabled();
    expect(screen.getByText('<')).not.toBeDisabled();
    expect(screen.getByText('>')).toBeDisabled();
    expect(screen.getByText('>>')).toBeDisabled();
  });
});
