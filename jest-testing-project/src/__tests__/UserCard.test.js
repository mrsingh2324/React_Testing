import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from '../components/UserCard';

// ============================================================
// JEST TEST SUITE FOR UserCard COMPONENT
// This is a "presentational" component — it just displays data
// passed through props. No user interaction needed.
// ============================================================

describe('UserCard Component', () => {

  // A sample user object we'll reuse in tests
  const sampleUser = {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    avatarUrl: 'https://example.com/alice.jpg',
  };

  // ---- RENDERING PROPS TESTS ------------------------------

  it('renders the user card container', () => {
    render(<UserCard {...sampleUser} />);
    expect(screen.getByTestId('user-card')).toBeInTheDocument();
  });

  it('renders the user name correctly', () => {
    render(<UserCard {...sampleUser} />);
    expect(screen.getByTestId('user-name')).toHaveTextContent('Alice Johnson');
  });

  it('renders the user email correctly', () => {
    render(<UserCard {...sampleUser} />);
    expect(screen.getByTestId('user-email')).toHaveTextContent(
      'alice@example.com'
    );
  });

  it('renders the user role correctly', () => {
    render(<UserCard {...sampleUser} />);
    expect(screen.getByTestId('user-role')).toHaveTextContent('Admin');
  });

  it('renders the avatar image with the correct src', () => {
    render(<UserCard {...sampleUser} />);
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toHaveAttribute('src', 'https://example.com/alice.jpg');
  });

  it('renders the avatar with the correct alt text', () => {
    render(<UserCard {...sampleUser} />);
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toHaveAttribute('alt', "Alice Johnson's avatar");
  });

  // ---- FALLBACK / EDGE CASE TESTS -------------------------
  // Testing behaviour when optional props are not provided

  it('uses a placeholder image when no avatarUrl is provided', () => {
    render(
      <UserCard name="Bob" email="bob@example.com" role="User" />
    );
    const avatar = screen.getByTestId('user-avatar');
    // Should fall back to placeholder
    expect(avatar).toHaveAttribute(
      'src',
      'https://via.placeholder.com/80'
    );
  });

  it('renders different users with different props', () => {
    const { rerender } = render(<UserCard {...sampleUser} />);
    expect(screen.getByTestId('user-name')).toHaveTextContent('Alice Johnson');

    // rerender lets us re-render the same component with new props
    rerender(
      <UserCard name="Bob Smith" email="bob@example.com" role="Editor" />
    );
    expect(screen.getByTestId('user-name')).toHaveTextContent('Bob Smith');
    expect(screen.getByTestId('user-role')).toHaveTextContent('Editor');
  });
});
