import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

// ============================================================
// JEST TEST SUITE FOR Counter COMPONENT
// ------------------------------------------------------------
// describe() groups related tests together
// it() or test() defines a single individual test case
// expect() makes an assertion (checks that something is true)
// ============================================================

describe('Counter Component', () => {

  // ---- RENDERING TESTS ------------------------------------
  // We check that the component renders correctly on screen

  it('renders the counter title', () => {
    render(<Counter />);
    // screen.getByTestId looks for an element with data-testid="counter-title"
    const title = screen.getByTestId('counter-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Counter');
  });

  it('renders initial count as 0', () => {
    render(<Counter />);
    const display = screen.getByTestId('count-display');
    expect(display).toHaveTextContent('Count: 0');
  });

  it('renders increment, decrement, and reset buttons', () => {
    render(<Counter />);
    expect(screen.getByTestId('increment-btn')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-btn')).toBeInTheDocument();
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
  });

  // ---- INTERACTION TESTS ----------------------------------
  // We simulate user actions with fireEvent and check results

  it('increments count when Increment is clicked', () => {
    render(<Counter />);
    const incrementBtn = screen.getByTestId('increment-btn');

    // Simulate a user click
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 1');

    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 2');
  });

  it('decrements count when Decrement is clicked', () => {
    render(<Counter />);
    const decrementBtn = screen.getByTestId('decrement-btn');

    fireEvent.click(decrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: -1');
  });

  it('resets count to 0 when Reset is clicked', () => {
    render(<Counter />);
    const incrementBtn = screen.getByTestId('increment-btn');
    const resetBtn = screen.getByTestId('reset-btn');

    // First, increment a few times
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 3');

    // Then reset
    fireEvent.click(resetBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 0');
  });

  it('allows count to go negative', () => {
    render(<Counter />);
    const decrementBtn = screen.getByTestId('decrement-btn');

    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    expect(screen.getByTestId('count-display')).toHaveTextContent('Count: -2');
  });
});
