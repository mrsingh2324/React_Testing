import React, { useState, useEffect } from 'react';

// FetchUser component - fetches and displays user data from an API
function FetchUser({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p data-testid="loading-text">Loading...</p>;
  if (error) return <p data-testid="error-text">Error: {error}</p>;

  return (
    <div data-testid="user-info">
      <h3 data-testid="user-name">{user.name}</h3>
      <p data-testid="user-email">{user.email}</p>
      <p data-testid="user-phone">{user.phone}</p>
    </div>
  );
}

export default FetchUser;
