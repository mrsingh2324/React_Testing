// This is the default App test from Create React App.
// It's intentionally kept minimal since this project focuses on Enzyme tests.
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the app without crashing', () => {
  render(<App />);
});
