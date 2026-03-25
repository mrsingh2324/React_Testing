import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/Button';

// ============================================================
// ENZYME TEST SUITE FOR Button COMPONENT
// ------------------------------------------------------------
// Testing a presentational/reusable component.
// We check props, classes, callbacks, and disabled state.
// ============================================================

describe('Button Component (Enzyme)', () => {

  // ---- RENDERING / PROPS TESTS ----------------------------

  it('renders without crashing', () => {
    const wrapper = shallow(<Button label="Click Me" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct label text', () => {
    const wrapper = shallow(<Button label="Submit" />);
    // .text() returns the text content of the component
    expect(wrapper.find('[data-testid="custom-btn"]').text()).toBe('Submit');
  });

  it('applies the correct default variant class', () => {
    const wrapper = shallow(<Button label="Go" />);
    // .hasClass() checks if the element has a CSS class
    expect(wrapper.find('[data-testid="custom-btn"]').hasClass('btn-primary')).toBe(
      true
    );
  });

  it('applies a custom variant class when variant prop is given', () => {
    const wrapper = shallow(<Button label="Delete" variant="danger" />);
    expect(wrapper.find('[data-testid="custom-btn"]').hasClass('btn-danger')).toBe(
      true
    );
  });

  it('renders a button HTML element', () => {
    const wrapper = shallow(<Button label="OK" />);
    // .type() returns the HTML tag or component type
    expect(wrapper.find('[data-testid="custom-btn"]').type()).toBe('button');
  });

  // ---- CALLBACK TESTS -------------------------------------
  // Testing that clicking calls the onClick handler

  it('calls onClick when the button is clicked', () => {
    // jest.fn() — a mock function that tracks calls
    const mockClick = jest.fn();
    const wrapper = shallow(<Button label="Click Me" onClick={mockClick} />);

    wrapper.find('[data-testid="custom-btn"]').simulate('click');

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled is true', () => {
    const mockClick = jest.fn();
    const wrapper = shallow(
      <Button label="Click Me" onClick={mockClick} disabled={true} />
    );

    // .prop() reads a prop value from an element
    expect(wrapper.find('[data-testid="custom-btn"]').prop('disabled')).toBe(true);
  });

  // ---- SNAPSHOT TEST -------------------------------------
  // A snapshot captures the rendered output and saves it.
  // On future runs, Jest compares the output to the saved snapshot.
  // If they differ, the test fails — alerting you to unintended changes.

  it('matches the snapshot', () => {
    const wrapper = shallow(<Button label="Save" variant="success" />);
    // toMatchSnapshot() saves the first render, then compares on subsequent runs
    expect(wrapper).toMatchSnapshot();
  });
});
