import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '.';

describe('Button component', () => {
  it('renders a default header', () => {
    render(<Header searchPokemons={async () => {}} />);
    expect(screen.getByText('Pokemon list')).toBeInTheDocument();
  });
});
