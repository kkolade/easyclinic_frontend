import { render } from 'test-utils';

import SignupPage from 'pages/SignupPage';

describe('SignupPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<SignupPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
