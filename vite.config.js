import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
});
