import { render } from 'test-utils';

import BookAppointmentPage from 'pages/BookAppointmentPage';

describe('BookAppointmentPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BookAppointmentPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
