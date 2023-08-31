import { rem } from '@mantine/core';

/**
 * @type {import ('@mantine/core').MantineThemeOverride}
 */
const themeOverride = {
  fontFamily: 'Open Sans, sans-serif',
  headings: {
    fontFamily: 'Raleway, sans-serif',
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
