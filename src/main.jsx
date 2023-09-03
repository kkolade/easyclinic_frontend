import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './redux/store';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
