import React, { useState } from 'react';

// Toggle component - shows/hides content on button click
function Toggle({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        data-testid="toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? `Hide ${label}` : `Show ${label}`}
      </button>
      {isOpen && (
        <div data-testid="toggle-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default Toggle;
