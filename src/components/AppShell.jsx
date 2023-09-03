import {
  AppShell,
  Burger,
  Header,
  Image,
  MediaQuery,
  NavLink,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userLogout } from '../redux/slices/userSlice';
import { selectUser } from '../redux/store';
import MainLinks from './MainLinks';

const MyAppShell = ({ children }) => {
  const mdScreenMin = useMediaQuery('(min-width: 62em)');
  const lgScreenMax = useMediaQuery('(max-width: 75em)');
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);

  const user = useSelector(selectUser);

  return (
    <AppShell
      navbar={(
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} py="md">
          {mdScreenMin && (
            <Navbar.Section>
              <Image
                width={lgScreenMax ? 150 : 200}
                mx="auto"
                src="/logo.png"
                alt="EasyClinic Logo"
              />
            </Navbar.Section>
          )}
          {user && (
            <Navbar.Section mt="xl">
              <Text align="center" fw="500">
                Welcome,
                {' '}
                {user.first_name}
                !
              </Text>
            </Navbar.Section>
          )}
          <Navbar.Section grow>
            <MainLinks />
            {user && (
              <NavLink
                component="button"
                onClick={() => dispatch(userLogout())}
                label="Sign out"
                icon={<IconLogout />}
                tt="uppercase"
                c="dark.3"
                variant="light"
                styles={{
                  label: {
                    fontSize: theme.fontSizes.md,
                    fontWeight: 700,
                  },
                }}
              />
            )}
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
        !mdScreenMin && (
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
