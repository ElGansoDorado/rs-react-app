import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import ExportControls from './export-controls';
import { useCSVDowload } from './use-csv-dowload';

vi.mock('./use-csv-dowload', () => ({
  useCSVDowload: vi.fn(),
}));

const mockClear = vi.fn();
const mockExportToCSV = vi.fn();

vi.mock('../../hooks/use-bag', () => ({
  useBag: vi.fn((selector) => {
    const mockState = {
      list: [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'charmander' },
      ],
      clear: mockClear,
    };
    return selector(mockState);
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  (useCSVDowload as Mock).mockReturnValue({
    downloadLinkRef: { current: null },
    exportToCSV: mockExportToCSV,
  });
});

describe('ExportControls Component', () => {
  it('should render correctly with item count', () => {
    render(<ExportControls />);

    expect(screen.getByText('selected items: 2')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByAltText('clear')).toBeInTheDocument();
    expect(screen.getByAltText('dowload')).toBeInTheDocument();
  });

  it('should call clear when clear button is clicked', () => {
    render(<ExportControls />);

    const clearButton = screen.getByAltText('clear').closest('button');
    if (clearButton) {
      fireEvent.click(clearButton);
    } else {
      throw new Error('Clear button not found');
    }

    expect(mockClear).toHaveBeenCalledTimes(1);
  });

  it('should call exportToCSV and clear when download button is clicked', () => {
    render(<ExportControls />);

    const downloadButton = screen.getByAltText('dowload').closest('button');
    if (downloadButton) {
      fireEvent.click(downloadButton);
    } else {
      throw new Error('Clear button not found');
    }

    expect(mockExportToCSV).toHaveBeenCalledTimes(1);
    expect(mockExportToCSV).toHaveBeenCalledWith([
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'charmander' },
    ]);
    expect(mockClear).toHaveBeenCalledTimes(1);
  });

  it('should have hidden anchor element for download', () => {
    const { container } = render(<ExportControls />);

    const anchor = container.querySelector('a');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveStyle('display: none');
  });
});
