// jest.polyfills.js
// This file runs BEFORE the Jest test framework is loaded.
// Used to polyfill globals that are missing in the jsdom environment.
// Enzyme's dependency (cheerio -> undici) requires TextDecoder/TextEncoder.

const { TextDecoder, TextEncoder } = require('util');
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
