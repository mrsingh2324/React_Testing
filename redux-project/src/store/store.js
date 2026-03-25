// store/store.js — The Redux STORE
// The store is the single source of truth for all state in your app.
// It holds the entire state tree of your application.

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

// configureStore() combines all slices into one store
const store = configureStore({
  reducer: {
    // Each key here becomes a "slice" of the global state
    // state.cart → managed by cartReducer
    // state.auth  → managed by authReducer
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
