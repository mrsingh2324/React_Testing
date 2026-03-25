import React from 'react';

// UserCard component - displays user information
function UserCard({ name, email, role, avatarUrl }) {
  return (
    <div data-testid="user-card">
      <img
        data-testid="user-avatar"
        src={avatarUrl || 'https://via.placeholder.com/80'}
        alt={`${name}'s avatar`}
      />
      <h3 data-testid="user-name">{name}</h3>
      <p data-testid="user-email">{email}</p>
      <span data-testid="user-role">{role}</span>
    </div>
  );
}

export default UserCard;
