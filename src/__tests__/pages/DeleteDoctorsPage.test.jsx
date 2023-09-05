import { render } from 'test-utils';

import DeleteDoctorsPage from 'pages/DeleteDoctorsPage';

describe('DeleteDoctorsPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<DeleteDoctorsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
