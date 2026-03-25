import React, { useState } from 'react';

// Counter component - a simple counter that increments and decrements
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2 data-testid="counter-title">Counter</h2>
      <p data-testid="count-display">Count: {count}</p>
      <button data-testid="increment-btn" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button data-testid="decrement-btn" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button data-testid="reset-btn" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
