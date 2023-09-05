import { render } from 'test-utils';

import AddDoctorPage from 'pages/AddDoctorPage';

describe('AddDoctorPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<AddDoctorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
