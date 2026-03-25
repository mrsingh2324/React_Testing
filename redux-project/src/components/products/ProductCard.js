// components/products/ProductCard.js
// This component READS from the Redux store using useSelector
// and DISPATCHES actions using useDispatch.

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import './ProductCard.css';

function ProductCard({ product }) {
  // useDispatch() gives us the dispatch function
  // We call dispatch(action) to send an action to the Redux store
  const dispatch = useDispatch();

  // useSelector() reads a piece of state from the Redux store
  // It re-renders the component whenever this state changes
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    // dispatch() sends the action to the store
    // addItem(product) creates the action: { type: 'cart/addItem', payload: product }
    dispatch(addItem(product));
  };

  return (
    <div className="product-card">
      <div className="product-emoji">{product.emoji}</div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button
          className={`add-btn ${isInCart ? 'in-cart' : ''}`}
          onClick={handleAddToCart}
        >
          {isInCart ? '✓ In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
