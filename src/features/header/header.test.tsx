import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '.';

describe('Header', () => {
  it('renders with default title content', () => {
    render(<Header searchPokemons={async () => {}} />);
    expect(screen.getByText('Pokemon list')).toBeInTheDocument();
  });

  it('contains search input field', () => {
    expect(screen.getByRole('search')).toBeInTheDocument();
  });
});
