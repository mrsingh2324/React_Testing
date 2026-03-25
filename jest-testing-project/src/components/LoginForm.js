import React, { useState } from 'react';

// LoginForm component - a login form with validation
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    if (onLogin) onLogin({ email, password });
  };

  return (
    <div>
      <h2 data-testid="form-title">Login</h2>
      {error && <p data-testid="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="submit-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
