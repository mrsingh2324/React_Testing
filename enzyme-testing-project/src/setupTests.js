// src/setupTests.js — This file runs BEFORE every test file
// We configure Enzyme here so we don't have to repeat it every file
// Note: Using @cfaester/enzyme-adapter-react-18 for React 18/19 compatibility

import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

// Configure Enzyme to work with React 18/19
Enzyme.configure({ adapter: new Adapter() });
