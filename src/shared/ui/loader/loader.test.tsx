import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Loader Component', () => {
  it('should render loading spinner and text', () => {
    render(<Loader />);

    const spinner = screen.getByText('߷');
    expect(spinner).toBeInTheDocument();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
