// components/cart/CartDrawer.js
// A slide-in cart drawer — demonstrates reading multiple pieces of state
// from the Redux store at once using multiple useSelector calls.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import CartItem from './CartItem';
import './CartDrawer.css';

function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();

  // useSelector reads from the Redux store — each selector subscribes
  // this component to re-render when that piece of state changes.
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <>
      {/* Overlay — clicking it closes the drawer */}
      {isOpen && <div className="overlay" onClick={onClose} />}

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({totalQuantity})</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span>🛒</span>
              <p>Your cart is empty!</p>
              <p>Add some products to get started.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Total</span>
              <span className="total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Checkout →</button>
            <button
              className="clear-btn"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
