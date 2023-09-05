import { render } from 'test-utils';

import DoctorDetailsPage from 'pages/DoctorDetailsPage';

describe('DoctorDetailsPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<DoctorDetailsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
