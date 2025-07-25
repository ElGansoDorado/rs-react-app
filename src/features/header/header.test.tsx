import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '.';

describe('Header', () => {
  it('should renders with default title content', () => {
    render(<Header />);
    expect(screen.getByText('Pokemon list')).toBeInTheDocument();
  });

  it('should  contains search input field', () => {
    expect(screen.getByRole('search')).toBeInTheDocument();
  });
});
