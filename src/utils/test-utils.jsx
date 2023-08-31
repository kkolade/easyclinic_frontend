/* eslint-disable import/no-extraneous-dependencies */

import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import store from '../redux/store';
import theme from '../theme';

const renderWithProviders = ({ children }) => (
  <Provider store={store}>
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      <Router>{children}</Router>
    </MantineProvider>
  </Provider>
);

const customRender = (ui, options) => render(ui, { wrapper: renderWithProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
