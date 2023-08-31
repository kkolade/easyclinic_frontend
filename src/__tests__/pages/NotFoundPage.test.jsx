/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NotFoundPage from 'pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Router>
        <NotFoundPage />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
