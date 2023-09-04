import { Flex, Loader } from '@mantine/core';

import MyAppShell from './AppShell';

const AppShellLoader = () => (
  <MyAppShell>
    <Flex align="center" justify="center" h="100%">
      <Loader />
    </Flex>
  </MyAppShell>
);

export default AppShellLoader;
