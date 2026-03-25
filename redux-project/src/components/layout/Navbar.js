// components/layout/Navbar.js
// The Navbar reads auth state (username) and cart count from Redux.
// It demonstrates how ANY component can access any part of the store.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/authSlice';
import './Navbar.css';

function Navbar({ onCartOpen }) {
  const dispatch = useDispatch();

  // Reading from two different slices in one component
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleAuthToggle = () => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      // In a real app, you'd get the username from a form/API
      dispatch(login({ username: 'Alex' }));
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span>🛍️</span>
        <h1>Redux Store</h1>
      </div>

      <div className="nav-right">
        {/* Auth state from state.auth slice */}
        <span className="nav-user">
          {isLoggedIn ? `👋 ${username}` : 'Guest'}
        </span>

        <button className="auth-btn" onClick={handleAuthToggle}>
          {isLoggedIn ? 'Logout' : 'Login as Alex'}
        </button>

        {/* Cart count badge from state.cart slice */}
        <button className="cart-btn" onClick={onCartOpen}>
          🛒 Cart
          {totalQuantity > 0 && (
            <span className="cart-badge">{totalQuantity}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
