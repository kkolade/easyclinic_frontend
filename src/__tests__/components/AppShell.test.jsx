import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { render } from 'test-utils';

import MyAppShell from 'components/AppShell';

describe('MyAppShell component', () => {
  it('renders children and logo when not on a small screen', () => {
    const { container } = render(
      <MyAppShell>
        <div data-testid="child-content">Child content</div>
      </MyAppShell>,
    );

    // Assert that the child content is rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    // Assert that the logo image is rendered (only on larger screens)
    expect(container.querySelector('img[src="/logo.png"]')).toBeInTheDocument();
  });
});
