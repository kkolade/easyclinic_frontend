import {
  AppShell,
  Burger,
  Header,
  Image,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../redux/store';
import MainLinks from './MainLinks';

const MyAppShell = ({ children }) => {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const largeScreen = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

  const [opened, setOpened] = useState(false);

  const user = useSelector(selectUser);

  return (
    <AppShell
      navbar={(
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, lg: 300 }} py="md">
          {!smallScreen && (
            <Navbar.Section mb="md">
              <Image
                width={largeScreen ? 150 : 200}
                mx="auto"
                src="/logo.png"
                alt="EasyClinic Logo"
              />
            </Navbar.Section>
          )}
          {user && (
            <Navbar.Section mb="md">
              <Text align="center" fw="600">
                Welcome,
                {' '}
                {user.first_name}
                !
              </Text>
            </Navbar.Section>
          )}
          <Navbar.Section grow>
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <Text align="center" c="dimmed" fz="sm">
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              EasyClinic
            </Text>
          </Navbar.Section>
        </Navbar>
      )}
      header={
        smallScreen && (
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
