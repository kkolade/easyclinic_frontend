import {
  AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';

const MyAppShell = ({ children }) => {
  const matches = useMediaQuery('(max-width: 48em)');
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      fixed={false}
      navbar={(
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} py="md" px="xs">
          <Text>Navbar</Text>
        </Navbar>
      )}
      header={
        matches && (
          <Header height={{ base: 50 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>
            </div>
          </Header>
        )
      }
      styles={{
        main: {
          background: theme.colors.gray[0],
        },
      }}
      padding="md"
    >
      {children}
    </AppShell>
  );
};

MyAppShell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyAppShell;
