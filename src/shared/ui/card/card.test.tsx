import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './card';

describe('Card Component', () => {
  const mockProps = {
    name: 'Pikachu',
    isActive: false,
    isBag: false,
    showDetail: vi.fn(),
  };

  it('renders correctly with name and inactive state', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('current')).toBeInTheDocument();
  });
});
