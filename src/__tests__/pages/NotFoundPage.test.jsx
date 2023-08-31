/**
 * @jest-environment jsdom
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import NotFoundPage from '../../pages/NotFoundPage';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <NotFoundPage />
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
