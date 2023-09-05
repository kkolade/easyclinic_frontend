import { render } from 'test-utils';

import MyAppointmentsPage from 'pages/MyAppointmentsPage';

describe('MyAppointmentsPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<MyAppointmentsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
