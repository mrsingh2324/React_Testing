import React, { useState } from 'react';

// Button component - a reusable button with variants
function Button({ label, variant, onClick, disabled }) {
  return (
    <button
      data-testid="custom-btn"
      className={`btn btn-${variant || 'primary'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
