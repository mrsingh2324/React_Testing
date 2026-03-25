import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '../components/Toggle';

// ============================================================
// ENZYME TEST SUITE FOR Toggle COMPONENT
// ------------------------------------------------------------
// Enzyme provides three rendering methods:
//   - shallow()  → Renders the component WITHOUT its children
//                  Fast, isolated, great for unit tests
//   - mount()    → Full rendering, including children & DOM
//   - render()   → Static HTML rendering (rarely used)
//
// Most Enzyme tests use shallow() for speed and isolation.
// ============================================================

describe('Toggle Component (Enzyme)', () => {

  // ---- INITIAL STATE TESTS --------------------------------

  it('renders without crashing', () => {
    // shallow() renders the component only one level deep
    const wrapper = shallow(<Toggle label="Details">Hello!</Toggle>);
    // .exists() checks if a matching element is in the tree
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the toggle button with correct initial text', () => {
    const wrapper = shallow(<Toggle label="Details">Hello!</Toggle>);
    // .find() is like querySelector — select elements by testid or tag
    const btn = wrapper.find('[data-testid="toggle-btn"]');
    expect(btn.text()).toBe('Show Details');
  });

  it('does NOT show content initially (isOpen is false)', () => {
    const wrapper = shallow(<Toggle label="Info">Secret content</Toggle>);
    // .find() returns an empty wrapper if nothing matches — length tells us
    expect(wrapper.find('[data-testid="toggle-content"]').length).toBe(0);
  });

  // ---- INTERACTION TESTS ----------------------------------

  it('shows content when the toggle button is clicked', () => {
    const wrapper = shallow(<Toggle label="Info">Secret content</Toggle>);

    // .simulate() triggers a synthetic event (like clicking)
    wrapper.find('[data-testid="toggle-btn"]').simulate('click');

    // Now the content should be visible
    expect(wrapper.find('[data-testid="toggle-content"]').length).toBe(1);
  });

  it('changes button text to "Hide" when opened', () => {
    const wrapper = shallow(<Toggle label="Details">Hello!</Toggle>);
    wrapper.find('[data-testid="toggle-btn"]').simulate('click');
    expect(wrapper.find('[data-testid="toggle-btn"]').text()).toBe(
      'Hide Details'
    );
  });

  it('hides content again when the button is clicked a second time', () => {
    const wrapper = shallow(<Toggle label="Info">Secret</Toggle>);

    // Click to open
    wrapper.find('[data-testid="toggle-btn"]').simulate('click');
    expect(wrapper.find('[data-testid="toggle-content"]').length).toBe(1);

    // Click to close
    wrapper.find('[data-testid="toggle-btn"]').simulate('click');
    expect(wrapper.find('[data-testid="toggle-content"]').length).toBe(0);
  });

  it('renders children inside the toggle content', () => {
    const wrapper = shallow(
      <Toggle label="Greeting">
        <p>Hello World</p>
      </Toggle>
    );
    wrapper.find('[data-testid="toggle-btn"]').simulate('click');

    // .contains() checks if a React element is somewhere in the tree
    expect(wrapper.contains(<p>Hello World</p>)).toBe(true);
  });
});
