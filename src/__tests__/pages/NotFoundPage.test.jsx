import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { render } from 'test-utils';

import NotFoundPage from 'pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    const { asFragment, getByText } = render(<NotFoundPage />);

    // check if title is rendered
    const titleElement = getByText(/Not Found \(404\)/i);
    expect(titleElement).toBeInTheDocument();

    // check if text is rendered
    const textElement = getByText(/Sorry, the page you are looking for does not exist/i);
    expect(textElement).toBeInTheDocument();

    // check if back to home button is rendered
    const buttonElement = getByText(/Back to home/i);
    expect(buttonElement.closest('a')).toHaveAttribute('href', '/');

    // check if snapshot matches
    expect(asFragment()).toMatchSnapshot();
  });

  it('should redirect to home page when back to home button is clicked', async () => {
    const { getByText } = render(<NotFoundPage />);

    const buttonElement = getByText(/Back to home/i);
    userEvent.click(buttonElement);

    expect(window.location.pathname).toBe('/');
  });
});
