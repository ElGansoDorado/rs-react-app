import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Card from './card';

describe('Card pokemon', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows pokemon stats', () => {
    render(<Card name="bulbasaur" active={true} showDetail={() => {}} />);

    expect(screen.getByText(/hp: 45/i)).toBeInTheDocument();
    expect(screen.getByText(/attack: 49/i)).toBeInTheDocument();
    expect(screen.getByText(/defense: 49/i)).toBeInTheDocument();
  });

  it('does not display missing data', () => {
    render(<Card name="bulbasaur" active={false} showDetail={() => {}} />);

    expect(screen.queryByText(/defense: 53/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });
});
