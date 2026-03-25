// store/cartSlice.js — The Cart SLICE
// A "slice" is a piece of Redux state + its reducers + its actions,
// all defined in one single file using Redux Toolkit's createSlice().

import { createSlice } from '@reduxjs/toolkit';

// The initial state for the cart slice
const initialState = {
  items: [],        // Array of products added to cart
  totalQuantity: 0, // Total number of items
  totalPrice: 0,    // Total price of all items
};

const cartSlice = createSlice({
  name: 'cart',   // Used as prefix for action types: "cart/addItem"

  initialState,

  // REDUCERS: functions that describe how state changes
  // Redux Toolkit uses Immer internally, so you CAN mutate state directly here
  // (it converts mutations to safe immutable updates behind the scenes)
  reducers: {

    // addItem: adds a product to the cart (or increments quantity if it exists)
    addItem(state, action) {
      // action.payload contains the data dispatched with the action
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        // Push a new item into the cart
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        // Increment quantity if already in cart
        existingItem.quantity++;
      }

      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    // removeItem: removes one unit of a product from the cart
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        // Remove the product entirely
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }

      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
    },

    // clearCart: empties the entire cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Redux Toolkit automatically generates action creators from your reducers
// cartSlice.actions gives you: { addItem, removeItem, clearCart }
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export the reducer to register it in the store
export default cartSlice.reducer;
