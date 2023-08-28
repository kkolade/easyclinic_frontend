import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
