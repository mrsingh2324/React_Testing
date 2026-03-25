import React, { act } from 'react';
import { mount } from 'enzyme';
import FetchUser from '../components/FetchUser';

// ============================================================
// ENZYME TEST SUITE FOR FetchUser COMPONENT
// ------------------------------------------------------------
// This component fetches data from an API using fetch().
// In tests, we NEVER hit a real API. Instead we "mock" it.
//
// global.fetch = jest.fn() replaces the real fetch function
// with a fake one we fully control.
//
// mount() is used here (instead of shallow()) because we
// need the full component lifecycle (useEffect) to run.
//
// act() ensures React processes all state updates before
// we make assertions — required for async state changes.
// ============================================================

describe('FetchUser Component (Enzyme)', () => {

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---- LOADING STATE TEST ---------------------------------

  it('shows a loading indicator initially', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    const wrapper = mount(<FetchUser userId={1} />);
    expect(wrapper.find('[data-testid="loading-text"]').length).toBe(1);
    expect(wrapper.find('[data-testid="loading-text"]').text()).toBe('Loading...');
  });

  // ---- SUCCESS STATE TEST ---------------------------------

  it('displays user data after a successful fetch', async () => {
    const fakeUser = {
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031',
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => fakeUser,
    });

    let wrapper;
    // act() wraps any code that causes React state updates
    await act(async () => {
      wrapper = mount(<FetchUser userId={1} />);
      // Wait for all pending promises (fetch + setState) to resolve
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    wrapper.update();

    expect(wrapper.find('[data-testid="user-info"]').length).toBe(1);
    expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Leanne Graham');
    expect(wrapper.find('[data-testid="user-email"]').text()).toBe('sincere@april.biz');
  });

  // ---- ERROR STATE TESTS ----------------------------------

  it('displays an error when the fetch fails (non-ok response)', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<FetchUser userId={999} />);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    wrapper.update();

    expect(wrapper.find('[data-testid="error-text"]').length).toBe(1);
    expect(wrapper.find('[data-testid="error-text"]').text()).toContain('User not found');
  });

  it('displays an error when fetch throws a network error', async () => {
    global.fetch.mockRejectedValue(new Error('Network Error'));

    let wrapper;
    await act(async () => {
      wrapper = mount(<FetchUser userId={1} />);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    wrapper.update();

    expect(wrapper.find('[data-testid="error-text"]').length).toBe(1);
    expect(wrapper.find('[data-testid="error-text"]').text()).toContain('Network Error');
  });

  // ---- VERIFYING fetch IS CALLED CORRECTLY ----------------

  it('calls fetch with the correct URL', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Test', email: 'test@test.com', phone: '123' }),
    });

    await act(async () => {
      mount(<FetchUser userId={5} />);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/5'
    );
  });
});
