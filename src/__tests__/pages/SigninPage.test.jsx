import { render } from 'test-utils';

import SigninPage from 'pages/SigninPage';

describe('SigninPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<SigninPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
