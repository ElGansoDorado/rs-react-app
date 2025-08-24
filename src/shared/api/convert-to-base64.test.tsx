import { describe, it, expect, vi } from 'vitest';
import { convertFileToDataURL } from './convert-to-base64';

interface MockFileReader {
  onload: (() => void) | null;
  onerror: (() => void) | null;
  readAsDataURL: (file: File) => void;
  result: string | null;
}

describe('convertFileToDataURL', () => {
  it('returns the Data URL when the file is successfully read', async () => {
    const mockFile = new File(['test'], 'image.png', { type: 'image/png' });

    const mockFileReader: MockFileReader = {
      onload: null,
      onerror: null,
      readAsDataURL: vi.fn(function (this: MockFileReader, file: File) {
        this.result = `data:${file.type};base64,test`;
        this.onload?.();
      }),
      result: null,
    };

    vi.stubGlobal(
      'FileReader',
      vi.fn(() => mockFileReader)
    );

    const result = await convertFileToDataURL(mockFile);

    expect(result).toBe('data:image/png;base64,test');
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it('generates an error on failure', async () => {
    const mockFile = new File(['test'], 'image.png', { type: 'image/png' });

    const mockFileReader: MockFileReader = {
      onload: null,
      onerror: null,
      readAsDataURL: vi.fn(function (this: MockFileReader) {
        this.onerror?.();
      }),
      result: null,
    };

    vi.stubGlobal(
      'FileReader',
      vi.fn(() => mockFileReader)
    );

    await expect(convertFileToDataURL(mockFile)).rejects.toThrow(
      'File reading error'
    );
  });
});
