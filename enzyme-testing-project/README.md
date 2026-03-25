# 🧫 Enzyme Testing Project

> A beginner-friendly React project that teaches you **Enzyme** for component testing — a complementary approach to Jest/RTL.

---

## 📖 Table of Contents

1. [What is Testing?](#-what-is-testing)
2. [What is Enzyme?](#-what-is-enzyme)
3. [Enzyme vs React Testing Library](#-enzyme-vs-react-testing-library)
4. [Core Concepts](#-core-concepts)
5. [Project Structure](#-project-structure)
6. [Running the Tests](#-running-the-tests)
7. [Understanding the Tests](#-understanding-the-tests)
8. [Quick Reference](#-quick-reference)

---

## 🤔 What is Testing?

**Testing** is the practice of writing code that automatically verifies your app works correctly.

Instead of manually opening the browser and clicking around every time you change code, you write tests that simulate those interactions and confirm the expected results — in milliseconds.

### The three A's of a test:
1. **Arrange** — Set up the component/data
2. **Act** — Perform an action (click, type, etc.)
3. **Assert** — Verify the result is what you expected

---

## 🧬 What is Enzyme?

**Enzyme** is a JavaScript testing utility for React, created by **Airbnb**. It gives you tools to **render** React components and **inspect** or **interact** with their output in a very detailed way.

While React Testing Library (RTL) focuses on testing what the **user** sees, Enzyme gives you more control to inspect the **internal structure** of components (props, state, component instances).

### Enzyme's Three Rendering Methods

| Method | What it does | When to use |
|--------|-------------|-------------|
| `shallow()` | Renders only the component, NOT its children | Default choice — fast unit tests |
| `mount()` | Full rendering including children and DOM | When you need lifecycle hooks or child components |
| `render()` | Returns static HTML | Rarely needed |

```js
import { shallow, mount } from 'enzyme';

const wrapper = shallow(<MyComponent />);   // fast, isolated
const wrapper = mount(<MyComponent />);    // full rendering
```

---

## ⚔️ Enzyme vs React Testing Library

| Feature | Enzyme | React Testing Library |
|---------|--------|----------------------|
| Philosophy | Test implementation details | Test like a user |
| Access state/props | ✅ Yes | ❌ No |
| Find by CSS class | ✅ Yes | Not recommended |
| Speed | ⚡ Very fast (`shallow`) | 🔶 Slightly slower |
| Maintained | Community-maintained | ✅ Actively maintained |
| Best for | Fine-grained unit tests | Integration & user-flow tests |

**Neither is "better"** — they solve different problems. Many teams use both!

---

## 🧠 Core Concepts

### `shallow()` — Shallow Rendering
Renders the component **one level deep**. Child components are not rendered — they appear as their tag names only.

```js
const wrapper = shallow(<Toggle label="Info">Hello</Toggle>);
// Children <p>, etc. inside Toggle ARE rendered
// But if Toggle rendered <ChildComponent />, it stays as <ChildComponent /> (not expanded)
```

---

### `.find()` — Selecting Elements
Like `querySelector` for your component tree.

```js
wrapper.find('[data-testid="toggle-btn"]')  // By data-testid attribute
wrapper.find('button')                       // By HTML tag
wrapper.find('.btn-primary')                 // By CSS class
wrapper.find(Button)                         // By component type
```

---

### `.simulate()` — Triggering Events
Simulates DOM events on elements.

```js
wrapper.find('button').simulate('click');
wrapper.find('input').simulate('change', { target: { value: 'hello' } });
```

---

### `.text()` — Getting Text Content
```js
wrapper.find('h2').text(); // Returns the text inside h2
```

---

### `.prop()` and `.props()` — Reading Props
```js
wrapper.find('button').prop('disabled'); // Gets the 'disabled' prop
wrapper.props(); // Gets all props of the root element
```

---

### `.hasClass()` — Checking CSS Classes
```js
wrapper.find('button').hasClass('btn-primary'); // Returns true/false
```

---

### `.length` — Counting Matched Elements
```js
wrapper.find('[data-testid="error"]').length; // 0 means not present, 1 means present
```

---

### `.update()` — Force Re-render
Used after async operations to make Enzyme reflect the latest state.

```js
await someAsyncAction();
wrapper.update(); // Sync wrapper with new state
```

---

### Mocking `fetch` for API Tests
When testing components that call APIs, **never** hit the real API. Instead, replace `fetch` with a mock:

```js
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ name: 'Alice', email: 'alice@test.com' }),
});
```

This makes `fetch` return fake data instantly, making tests fast and reliable.

---

### Snapshot Testing
A snapshot captures the entire rendered output of a component and saves it to a file. On future runs, Jest compares the new output to the snapshot. If they differ, the test fails — alerting you to unintended UI changes.

```js
expect(wrapper).toMatchSnapshot();
// First run: saves the snapshot
// Subsequent runs: compares against the saved snapshot
```

To update snapshots intentionally: `npm test -- --updateSnapshot`

---

## 📂 Project Structure

```
enzyme-testing-project/
├── src/
│   ├── components/
│   │   ├── Toggle.js       ← Show/hide content with useState
│   │   ├── Button.js       ← Reusable button with variant props
│   │   └── FetchUser.js    ← Async component that calls an API
│   ├── __tests__/
│   │   ├── Toggle.test.js  ← Tests: shallow, simulate, state changes
│   │   ├── Button.test.js  ← Tests: props, classes, callbacks, snapshots
│   │   └── FetchUser.test.js← Tests: mount, lifecycle, async, mocked fetch
│   └── setupTests.js       ← Configures the Enzyme adapter
└── package.json
```

---

## 🚀 Running the Tests

```bash
# Run all tests in watch mode
npm test

# Run once and exit
npm test -- --watchAll=false

# Update snapshots
npm test -- --updateSnapshot
```

### Expected output:

```
 PASS  src/__tests__/Toggle.test.js
  Toggle Component (Enzyme)
    ✓ renders without crashing (18ms)
    ✓ renders the toggle button with correct initial text (5ms)
    ✓ shows content when the toggle button is clicked (8ms)
    ...

 PASS  src/__tests__/Button.test.js
 PASS  src/__tests__/FetchUser.test.js

Test Suites: 3 passed, 3 total
Tests:       16 passed, 16 total
```

---

## 🔍 Understanding the Tests

### Toggle.test.js (shallow rendering)
- Tests that content is hidden by default (`length === 0`)
- Simulates clicks and checks that content appears/disappears
- Uses `wrapper.contains()` to check rendered children

### Button.test.js (shallow + snapshots)
- Tests the label text with `.text()`
- Tests CSS variant with `.hasClass()`
- Tests click callbacks with `jest.fn()`
- Tests that `disabled` prop is passed correctly
- Demonstrates snapshot testing with `.toMatchSnapshot()`

### FetchUser.test.js (mount + async + mocked fetch)
- Uses `mount()` because `useEffect` (the hook that fetches data) only runs in full rendering
- Mocks `global.fetch` to return controlled fake data
- Tests the loading state (immediately after render)
- Tests the success state (after fake fetch resolves)
- Tests the error state (when fetch returns `ok: false`)
- Tests that fetch is called with the correct URL

---

## 📚 Quick Reference

```js
// Render
const wrapper = shallow(<Component prop="x" />)
const wrapper = mount(<Component prop="x" />)

// Find
wrapper.find('[data-testid="id"]')
wrapper.find('button')
wrapper.find('.class-name')

// State & Props
wrapper.find('input').prop('value')
wrapper.props()

// Assertions
wrapper.exists()                           // Is it in the tree?
wrapper.find('el').length                  // How many matching elements?
wrapper.find('el').text()                  // Text content
wrapper.find('el').hasClass('my-class')    // Has CSS class?
wrapper.find('el').prop('disabled')        // Prop value

// Events
wrapper.find('button').simulate('click')
wrapper.find('input').simulate('change', { target: { value: 'text' } })

// Snapshots
expect(wrapper).toMatchSnapshot()

// Async
await new Promise(r => setTimeout(r, 0)); // Flush promises
wrapper.update();                          // Force re-render
```

---

> 💡 **Tip**: Start with `shallow()` for all your tests. Only switch to `mount()` when you need lifecycle methods (`useEffect`) or when testing child component integration.
