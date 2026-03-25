// App.js — The root component
// Here we:
// 1. Wrap the entire app in <Provider> so all components can access the Redux store
// 2. Manage local UI state (cart open/closed) with useState
//    → Note: small UI state like "is the drawer open?" lives in React, NOT Redux.
//      Redux is for SHARED application data, not UI-only state.

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/layout/Navbar';
import ProductCard from './components/products/ProductCard';
import CartDrawer from './components/cart/CartDrawer';
import products from './data/products';
import './App.css';

// All components inside <Provider store={store}> can use
// useSelector() and useDispatch() to interact with Redux.
function App() {
  // isCartOpen is LOCAL state — it only matters for this one component's UI
  // It doesn't need to be shared, so React useState is perfect here.
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="app">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />

        <main className="main-content">
          <div className="page-header">
            <h2>🖥️ Tech Accessories</h2>
            <p>Add items to your cart to see Redux state update in real time.</p>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </Provider>
  );
}

export default App;
