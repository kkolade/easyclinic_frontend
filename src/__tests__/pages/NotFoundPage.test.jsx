import NotFoundPage from 'pages/NotFoundPage';
import { render } from 'test-utils';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<NotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
