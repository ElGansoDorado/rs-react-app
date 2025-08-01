import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { About } from './about.page';
import { describe, expect, it } from 'vitest';

describe('About Component', () => {
  it('should render all critical sections and content', () => {
    render(<About />);

    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(
      screen.getByText('yakovchik denis - frontend deweloper')
    ).toBeInTheDocument();

    const description = screen.getByText(
      /Junior Frontend Developer skilled in HTML/
    );
    expect(description).toBeInTheDocument();

    const profileImg = screen.getByAltText('photo');
    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/87077649?v=4'
    );

    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    expect(screen.getByText('RS School React')).toBeInTheDocument();
    expect(screen.getByText('PokemonAPI')).toBeInTheDocument();
  });
});
