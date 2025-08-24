import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './button';

vi.mock('./button.module.css', () => ({
  default: {
    button: 'button-class',
  },
}));

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    render(<Button name="Click me" />);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('accepts and uses props disabled', () => {
    render(<Button name="Disabled Button" disabled={true} />);

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('The button is not disabled by default', () => {
    render(<Button name="Enabled Button" />);

    const button = screen.getByRole('button', { name: 'Enabled Button' });
    expect(button).not.toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button name="Clickable" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Clickable' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button name="Disabled Click" disabled={true} onClick={handleClick} />
    );

    const button = screen.getByRole('button', { name: 'Disabled Click' });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has the correct id attribute', () => {
    render(<Button name="Test Button" />);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveAttribute('id', 'Test Button');
  });

  it('applies a CSS class from a module', () => {
    render(<Button name="Styled Button" />);

    const button = screen.getByRole('button', { name: 'Styled Button' });
    expect(button).toHaveClass('button-class');
  });

  it('works with different names', () => {
    const { rerender } = render(<Button name="First" />);
    expect(screen.getByText('First')).toBeInTheDocument();

    rerender(<Button name="Second" />);
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });

  it('correctly handles changes to the disabled state', () => {
    const { rerender } = render(<Button name="Test" disabled={false} />);
    const button = screen.getByRole('button', { name: 'Test' });

    expect(button).not.toBeDisabled();

    rerender(<Button name="Test" disabled={true} />);
    expect(button).toBeDisabled();

    rerender(<Button name="Test" disabled={false} />);
    expect(button).not.toBeDisabled();
  });
});
