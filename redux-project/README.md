# 🏪 Redux Project — Shopping Cart

> A beginner-friendly React + Redux Toolkit project. Learn Redux by building a real shopping cart.

---

## 📖 Table of Contents
1. [The Problem Redux Solves](#-the-problem-redux-solves)
2. [What is Redux?](#-what-is-redux)
3. [Redux Toolkit](#-redux-toolkit)
4. [Core Concepts](#-core-concepts)
5. [Project Structure](#-project-structure)
6. [Data Flow](#-data-flow-step-by-step)
7. [Running the App](#-running-the-app)
8. [Quick Reference](#-quick-reference)

---

## 😩 The Problem Redux Solves

In React, you pass data between components using **props**. This works fine for small apps. But imagine:

```
App
├── Navbar  ← needs cart count
├── ProductList
│   └── ProductCard  ← needs to add to cart
└── CartDrawer  ← needs cart items, total
```

Without Redux, `App` would hold the cart state and pass it as props to every component that needs it. This is called **"prop drilling"** — messy and hard to maintain.

**Redux fixes this by creating one central place (the "store") where all components can read and update shared state directly.**

---

## 🏪 What is Redux?

Redux is a **state management library**. It gives your app a single, predictable global state.

Think of it like a **database for your React UI**:
- Any component can **read** from it
- Any component can **update** it (by dispatching actions)
- The state only ever changes in one predictable way

### The three principles of Redux:
1. **Single source of truth** — One store, one state tree
2. **State is read-only** — You can't mutate it directly; you send actions
3. **Changes via pure functions** — Reducers describe how state transforms

---

## ⚡ Redux Toolkit

**Redux Toolkit (RTK)** is the modern, official way to write Redux. It eliminates the boilerplate of old Redux:

| Old Redux | Redux Toolkit |
|-----------|--------------|
| Write action type constants | ❌ Not needed |
| Write action creators manually | ❌ Not needed |
| Write switch/case reducers | ✅ Simplified with `createSlice` |
| Mutating state is forbidden | ✅ You can write "mutating" code (Immer handles it) |

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 🧠 Core Concepts

### 1. Store — The Global State Container

```js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
```

The store holds **all** your app's shared state. Think of it as one big JavaScript object:
```js
{
  cart: { items: [...], totalQuantity: 3, totalPrice: 149.97 },
  auth: { isLoggedIn: true, username: 'Alice' }
}
```

---

### 2. Slice — State + Reducers + Actions in One Place

```js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0, totalPrice: 0 },
  reducers: {
    addItem(state, action) {
      state.items.push({ ...action.payload, quantity: 1 }); // Direct mutation (Immer makes this safe)
      state.totalQuantity++;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions; // Auto-generated action creators
export default cartSlice.reducer;
```

---

### 3. Action — What Happened?

An action is a plain object describing an event:
```js
{ type: 'cart/addItem', payload: { id: 1, name: 'Keyboard', price: 129.99 } }
```

You create actions using the auto-generated creators from your slice:
```js
addItem({ id: 1, name: 'Keyboard', price: 129.99 })
// → { type: 'cart/addItem', payload: { id: 1, name: 'Keyboard', price: 129.99 } }
```

---

### 4. Reducer — How State Changes

A reducer is a function that takes the current state + an action and returns the new state:
```js
addItem(state, action) {
  state.items.push({ ...action.payload, quantity: 1 });
  state.totalQuantity++;
  state.totalPrice += action.payload.price;
}
```
Redux Toolkit uses **Immer** under the hood, so you can write "mutating" code directly and it produces correct immutable updates.

---

### 5. `useDispatch()` — Send an Action

```js
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addItem(product)); // Sends the action to the store
  };
}
```

---

### 6. `useSelector()` — Read State

```js
import { useSelector } from 'react-redux';

function CartBadge() {
  // The selector function picks which piece of state you need
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return <span>{totalQuantity}</span>;
}
```

The component **automatically re-renders** whenever the selected state changes.

---

### 7. `<Provider>` — Connect Store to React

Wrap your entire app in `<Provider>` once. All components inside it can then use `useSelector` and `useDispatch`.

```jsx
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <ProductList />
    </Provider>
  );
}
```

---

## 📂 Project Structure

```
redux-project/
└── src/
    ├── store/
    │   ├── store.js       ← configureStore — combines all slices
    │   ├── cartSlice.js   ← cart state: items, totalQuantity, totalPrice
    │   └── authSlice.js   ← auth state: isLoggedIn, username
    ├── components/
    │   ├── layout/
    │   │   └── Navbar.js  ← reads auth + cart, dispatches login/logout
    │   ├── products/
    │   │   └── ProductCard.js  ← dispatch addItem
    │   └── cart/
    │       ├── CartDrawer.js   ← reads cart items, dispatches clearCart
    │       └── CartItem.js     ← dispatches addItem / removeItem
    ├── data/
    │   └── products.js    ← static product data
    └── App.js             ← <Provider store={store}>
```

---

## 🔄 Data Flow — Step by Step

```
1. User clicks "Add to Cart" button
      ↓
2. dispatch(addItem(product))
      ↓
3. Action { type: 'cart/addItem', payload: product } sent to store
      ↓
4. cartSlice reducer handles it → updates state.cart
      ↓
5. All useSelector subscribers re-render with the new state
   (CartDrawer badge, Navbar count, ProductCard "in cart" style)
```

---

## 🚀 Running the App

```bash
npm start
```

**Try this to see Redux in action:**
1. Click **"Login as Alex"** → `state.auth.isLoggedIn` changes, Navbar updates instantly
2. Click **"Add to Cart"** on any product → `state.cart` updates, badge in Navbar updates
3. Open the cart → see items, adjust quantities → `totalPrice` recalculates automatically
4. Click **"Clear Cart"** → `state.cart` resets to initial state

---

## 📚 Quick Reference

```js
// 1. Create a slice
const mySlice = createSlice({
  name: 'mySlice',
  initialState: { value: 0 },
  reducers: {
    increment(state) { state.value++; },
    setTo(state, action) { state.value = action.payload; },
  },
});
export const { increment, setTo } = mySlice.actions;
export default mySlice.reducer;

// 2. Add to store
const store = configureStore({ reducer: { mySlice: mySlice.reducer } });

// 3. Wrap app in Provider
<Provider store={store}><App /></Provider>

// 4. Read state
const value = useSelector((state) => state.mySlice.value);

// 5. Update state
const dispatch = useDispatch();
dispatch(increment());
dispatch(setTo(42));
```

---

> 💡 **Rule of thumb:** Use Redux for state that MULTIPLE components need to access or modify. Use local `useState` for state that only belongs to one component (like "is this dropdown open?").
