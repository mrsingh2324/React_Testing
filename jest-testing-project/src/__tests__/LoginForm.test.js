import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

// ============================================================
// JEST TEST SUITE FOR LoginForm COMPONENT
// We use a "mock function" (jest.fn()) to simulate the onLogin
// callback prop without needing real login logic.
// ============================================================

describe('LoginForm Component', () => {

  // ---- RENDERING TESTS ------------------------------------

  it('renders the form title', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('form-title')).toHaveTextContent('Login');
  });

  it('renders email input, password input, and submit button', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('does not show an error message on initial render', () => {
    render(<LoginForm />);
    // queryByTestId returns null instead of throwing if element is not found
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  // ---- VALIDATION TESTS -----------------------------------
  // Testing form validation logic

  it('shows error when form is submitted empty', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Both fields are required.'
    );
  });

  it('shows error when email is invalid (missing @)', () => {
    render(<LoginForm />);
    // fireEvent.change simulates typing into an input
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Please enter a valid email.'
    );
  });

  it('shows error when only password is missing', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    // Password left empty
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Both fields are required.'
    );
  });

  // ---- CALLBACK / MOCK FUNCTION TESTS ---------------------
  // jest.fn() creates a fake function that records how it was called

  it('calls onLogin with email and password when form is valid', () => {
    // Create a mock function — it does nothing, but we can spy on it
    const mockOnLogin = jest.fn();

    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));

    // Verify the mock was called exactly once
    expect(mockOnLogin).toHaveBeenCalledTimes(1);

    // Verify it was called with the correct arguments
    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret123',
    });
  });

  it('does not call onLogin when form is invalid', () => {
    const mockOnLogin = jest.fn();
    render(<LoginForm onLogin={mockOnLogin} />);

    // Submit without filling in fields
    fireEvent.click(screen.getByTestId('submit-btn'));

    // The mock should NOT have been called
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('clears error on successful submission', () => {
    const mockOnLogin = jest.fn();
    render(<LoginForm onLogin={mockOnLogin} />);

    // First trigger an error
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('error-message')).toBeInTheDocument();

    // Now fill in valid data and submit
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));

    // Error should be gone
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
