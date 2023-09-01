import '@testing-library/jest-dom';
import { render } from 'test-utils';

import MainLinks from 'components/MainLinks';

describe('MainLinks component', () => {
  test('renders MainLink components correctly', () => {
    const { getByText } = render(<MainLinks />);

    // Test that the Home link is rendered correctly
    const homeLink = getByText('Home').closest('a');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    // Test that the Sign in link is rendered correctly
    const signInLink = getByText('Sign in').closest('a');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/signin');
  });

  test('sets the "active" prop correctly based on the current pathname', () => {
    const { getByText } = render(<MainLinks />);

    // Test that the Home link has the "active" prop set to true
    const homeLink = getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('data-active', 'true');

    // Test that the Sign in link has the "active" prop set to false
    const signInLink = getByText('Sign in').closest('a');
    expect(signInLink).not.toHaveAttribute('data-active');
  });
});
