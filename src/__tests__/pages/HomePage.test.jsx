import { render } from 'test-utils';

import HomePage from 'pages/HomePage';

describe('HomePage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
