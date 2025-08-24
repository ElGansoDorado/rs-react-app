import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './header';

vi.mock('@/shared/store', () => ({
  useShowForm: () => ({
    showFormOne: vi.fn(),
    showFormTwo: vi.fn(),
  }),
}));

vi.mock('..', () => ({
  Button: ({ name, onClick }: { name: string; onClick: () => void }) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

describe('Header', () => {
  it('renders header with title and buttons', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Forms App')).toBeInTheDocument();
    expect(screen.getByText('form hook')).toBeInTheDocument();
    expect(screen.getByText('form ref')).toBeInTheDocument();
  });
});
