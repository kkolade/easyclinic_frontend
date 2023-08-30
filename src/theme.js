import { rem } from '@mantine/core';

/**
 * @type {import ('@mantine/core').MantineThemeOverride}
 */
const themeOverride = {
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'Alfa Slab One, cursive',
  },
  components: {
    Button: {
      styles: {
        root: {
          padding: `0 ${rem(16)}`,
        },
      },
    },
    Text: {
      styles: {
        root: {
          fontWeight: 'normal',
        },
      },
    },
  },
};

export default themeOverride;
