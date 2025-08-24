import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Main from './main';
import { useUser } from '@/shared/store';
import type { User } from '@/shared/model/user.types';

vi.mock('@/shared/store/use-user', () => {
  return {
    useUser: vi.fn(),
  };
});

describe('Main Component', () => {
  const mockClear = vi.fn();
  const mockAddUser = vi.fn();
  const mockRemoveUser = vi.fn();

  const mockUserState = {
    list: [] as User[],
    clear: mockClear,
    addUser: mockAddUser,
    removeUser: mockRemoveUser,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useUser).mockImplementation((selector) => {
      return selector({ ...mockUserState, list: [] });
    });
  });

  it('displays a message when the list is empty', () => {
    render(<Main />);

    expect(screen.getByText('Clear list')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('displays users from the list', () => {
    const mockUsers: User[] = [
      {
        username: 'john_doe',
        age: 25,
        email: 'john@example.com',
        password: 'password123',
        gender: 'M',
        TAC: true,
        img: 'john.jpg',
        country: 'USA',
      },
      {
        username: 'jane_smith',
        age: 30,
        email: 'jane@example.com',
        password: 'password456',
        gender: 'F',
        TAC: true,
        img: 'jane.jpg',
        country: 'Canada',
      },
    ];

    vi.mocked(useUser).mockImplementation((selector) => {
      return selector({ ...mockUserState, list: mockUsers });
    });

    render(<Main />);

    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('jane_smith')).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'john.jpg');
    expect(images[0]).toHaveAttribute('alt', 'john_doe');
    expect(images[1]).toHaveAttribute('src', 'jane.jpg');
    expect(images[1]).toHaveAttribute('alt', 'jane_smith');
  });

  it('calls clear when the button is clicked', async () => {
    const mockUsers: User[] = [
      {
        username: 'test_user',
        age: 25,
        email: 'test@example.com',
        password: 'password123',
        gender: 'M',
        TAC: true,
        img: 'test.jpg',
        country: 'USA',
      },
    ];

    vi.mocked(useUser).mockImplementation((selector) => {
      return selector({ ...mockUserState, list: mockUsers });
    });

    const user = userEvent.setup();
    render(<Main />);

    const clearButton = screen.getByText('Clear list');
    await user.click(clearButton);

    expect(mockClear).toHaveBeenCalledTimes(1);
  });

  it('correctly displays image attributes', () => {
    const mockUser: User = {
      username: 'test_user',
      age: 25,
      email: 'test@example.com',
      password: 'password123',
      gender: 'M',
      TAC: true,
      img: 'https://example.com/avatar.jpg',
      country: 'USA',
    };

    vi.mocked(useUser).mockImplementation((selector) => {
      return selector({ ...mockUserState, list: [mockUser] });
    });

    render(<Main />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(image).toHaveAttribute('alt', 'test_user');
    expect(image).toHaveClass('app__img');
  });
});
