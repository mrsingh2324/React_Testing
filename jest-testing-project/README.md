# 🧪 Jest Testing Project

> A beginner-friendly React project that teaches you **Jest** and **React Testing Library** from scratch.

---

## 📖 Table of Contents

1. [What is Testing?](#-what-is-testing)
2. [Why Test React Apps?](#-why-test-react-apps)
3. [What is Jest?](#-what-is-jest)
4. [What is React Testing Library?](#-what-is-react-testing-library)
5. [Core Concepts](#-core-concepts)
6. [Project Structure](#-project-structure)
7. [Running the Tests](#-running-the-tests)
8. [Understanding the Tests](#-understanding-the-tests)

---

## 🤔 What is Testing?

Imagine you build a light switch. Before handing it to someone, you'd **flip it up and down a few times** to make sure the light turns on and off correctly. That's testing.

In software, **testing** means writing code that automatically checks that your other code works correctly. Instead of manually clicking around your app every time you make a change, you write tests that do it for you — instantly, every time.

### Types of Tests

| Type | What it checks | Speed |
|------|---------------|-------|
| **Unit Test** | A single function or component in isolation | ⚡ Very fast |
| **Integration Test** | Multiple components working together | 🔶 Medium |
| **End-to-End (E2E) Test** | The full app as a user would use it | 🐢 Slow |

In this project, we focus on **Unit Tests** and a few **Integration Tests**.

---

## 💡 Why Test React Apps?

- **Catch bugs early** — before your users do
- **Fearless refactoring** — change code confidently knowing tests will catch breaks
- **Documentation** — tests show exactly how a component is supposed to behave
- **Save time** — one test run covers all components automatically

---

## 🃏 What is Jest?

**Jest** is a JavaScript **test runner** made by Facebook (Meta). It's the most popular testing tool for React.

Think of Jest as a "referee" that:
1. Finds all your test files (files ending in `.test.js`)
2. Runs each test
3. Tells you which ones passed ✅ and which ones failed ❌
4. Shows you exactly what went wrong

### What Jest provides:
- `describe()` — Groups related tests
- `it()` / `test()` — Defines a single test
- `expect()` — Makes an assertion (checks that something is true)
- `jest.fn()` — Creates mock (fake) functions
- Snapshot testing — Captures rendered output to detect unintended changes

**Good news:** CRA (Create React App) comes with Jest pre-installed. No setup needed!

---

## 🐙 What is React Testing Library?

**React Testing Library (RTL)** works alongside Jest. While Jest runs the tests, RTL gives you tools to:
- **Render** React components in a virtual browser (called "jsdom")
- **Query** elements the way users see them (by text, label, role, or test ID)
- **Simulate** user actions like clicking and typing

### The RTL Philosophy

> *"Test your components the way users use them."*

Instead of checking internal state or implementation details, RTL encourages you to test **what the user sees and does**.

### Key RTL functions:

```js
import { render, screen, fireEvent } from '@testing-library/react';

render(<MyComponent />)            // Render the component
screen.getByTestId('my-element')   // Find element by data-testid
screen.getByText('Submit')         // Find element by visible text
fireEvent.click(button)            // Simulate a click
fireEvent.change(input, { target: { value: 'hello' } }) // Simulate typing
```

---

## 🧠 Core Concepts

### `describe()` — Grouping Tests
```js
describe('Counter Component', () => {
  // All Counter tests live here
});
```
Organizes tests into logical groups. Think of it as a folder.

---

### `it()` / `test()` — A Single Test
```js
it('renders the title', () => {
  // This is one specific thing being checked
});
```
Each `it()` block tests **one specific behaviour**. If it passes, ✅. If not, ❌.

---

### `expect()` + Matchers — Making Assertions
```js
expect(element).toBeInTheDocument();  // Is it on the page?
expect(element).toHaveTextContent('Hello'); // Does it say 'Hello'?
expect(mockFn).toHaveBeenCalledTimes(1);   // Was it called once?
```
An **assertion** is a statement of what you expect to be true.

---

### `jest.fn()` — Mock Functions
```js
const mockOnLogin = jest.fn();
// Now you can check if it was called:
expect(mockOnLogin).toHaveBeenCalledWith({ email: '...', password: '...' });
```
A **mock function** is a fake function that:
- Does nothing by default (doesn't trigger real logic)
- Records how many times it was called and with what arguments

---

### `data-testid` attributes
```jsx
<button data-testid="submit-btn">Submit</button>
// Then in tests:
screen.getByTestId('submit-btn')
```
These are custom HTML attributes we add to help tests find elements without relying on CSS classes or element positions.

---

## 📂 Project Structure

```
jest-testing-project/
├── src/
│   ├── components/
│   │   ├── Counter.js       ← Simple counter with increment/decrement/reset
│   │   ├── LoginForm.js     ← Form with validation and a callback prop
│   │   └── UserCard.js      ← Presentational component showing user info
│   ├── __tests__/
│   │   ├── Counter.test.js  ← Tests: rendering, click events, state changes
│   │   ├── LoginForm.test.js← Tests: validation, mock functions, error states
│   │   └── UserCard.test.js ← Tests: props, fallbacks, rerender
│   └── setupTests.js        ← Auto-runs before tests (adds extra matchers)
└── package.json
```

---

## 🚀 Running the Tests

```bash
# Run all tests (watch mode — re-runs when you save files)
npm test

# Run tests once and exit (useful in CI)
npm test -- --watchAll=false

# Run a specific test file
npm test Counter
```

### What you'll see:

```
 PASS  src/__tests__/Counter.test.js
  Counter Component
    ✓ renders the counter title (25ms)
    ✓ renders initial count as 0 (5ms)
    ✓ increments count when Increment is clicked (10ms)
    ...

Test Suites: 3 passed, 3 total
Tests:       18 passed, 18 total
```

---

## 🔍 Understanding the Tests

### Counter.test.js
- **Rendering tests**: Checks that elements appear on screen
- **Interaction tests**: Simulates button clicks and checks that count changes

### LoginForm.test.js
- **Validation tests**: Submits the form empty/invalid and checks for error messages
- **Mock function tests**: Verifies the `onLogin` callback is called with the right data

### UserCard.test.js
- **Props tests**: Checks that passed props (name, email, role) appear correctly
- **Edge case tests**: Checks fallback when `avatarUrl` is not provided
- **Rerender test**: Uses `rerender()` to test the same component with different props

---

## 📚 Quick Reference

```js
// Render
render(<Component prop="value" />)

// Query
screen.getByTestId('id')          // Throws if not found
screen.queryByTestId('id')        // Returns null if not found (good for "not exist" checks)
screen.getByText('Hello')

// Events
fireEvent.click(element)
fireEvent.change(input, { target: { value: 'text' } })

// Assertions
expect(el).toBeInTheDocument()
expect(el).toHaveTextContent('Hello')
expect(el).toHaveAttribute('src', 'https://...')
expect(fn).toHaveBeenCalledTimes(1)
expect(fn).toHaveBeenCalledWith({ key: 'value' })
expect(fn).not.toHaveBeenCalled()
```

---

> 💡 **Tip**: Read each test file carefully — every line has comments explaining what and why!
