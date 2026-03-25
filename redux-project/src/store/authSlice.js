// store/authSlice.js — The Authentication SLICE
// A second slice to show how multiple slices work together in one store.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: sets the user as logged in
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username; // action.payload = { username: 'Alice' }
    },

    // logout: clears auth state
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
