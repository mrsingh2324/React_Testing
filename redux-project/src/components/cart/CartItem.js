// components/cart/CartItem.js
// A single item inside the cart drawer.
// Uses dispatch to send removeItem and addItem actions.

import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../store/cartSlice';
import './CartItem.css';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <span className="cart-item-emoji">{item.emoji}</span>
      <div className="cart-item-info">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="cart-item-controls">
        {/* Dispatch removeItem — the payload is the product's id */}
        <button onClick={() => dispatch(removeItem(item.id))}>−</button>
        <span>{item.quantity}</span>
        {/* Dispatch addItem — the payload is the full product object */}
        <button onClick={() => dispatch(addItem(item))}>+</button>
      </div>
    </div>
  );
}

export default CartItem;
