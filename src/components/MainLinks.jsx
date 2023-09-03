import { Box, NavLink, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome, IconLogin, IconLogout } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { userSignout } from '../redux/slices/userSlice';
import { selectUser } from '../redux/store';

const NavigationLink = ({
  icon, label, path, active,
}) => {
  const theme = useMantineTheme();

  return (
    <NavLink
      component={Link}
      to={path}
      label={label}
      icon={icon}
      tt="uppercase"
      c="dark.3"
      variant="light"
      styles={{
        label: {
          fontSize: theme.fontSizes.md,
          fontWeight: 700,
        },
      }}
      active={active}
    />
  );
};

const NavigationButton = ({ icon, label, onClick }) => {
  const theme = useMantineTheme();

  return (
    <NavLink
      component="button"
      type="button"
      label={label}
      icon={icon}
      tt="uppercase"
      c="dark.3"
      variant="light"
      styles={{
        label: {
          fontSize: theme.fontSizes.md,
          fontWeight: 700,
        },
      }}
      onClick={onClick}
    />
  );
};

const navigationLinks = [{ icon: <IconHome />, label: 'Home', path: '/' }];
const signedInLinks = [];
const signedOutLinks = [{ icon: <IconLogin />, label: 'Sign in', path: '/signin' }];
const adminLinks = [];

const MainLinks = () => {
  const smScreen = useMediaQuery('(max-width: 48em)');
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const renderLinks = () => {
    if (!user) return navigationLinks.concat(signedOutLinks);

    let links = navigationLinks.concat(signedInLinks);
    if (user.role === 'admin') {
      links = links.concat(adminLinks);
    }
    return links;
  };

  const links = renderLinks().map(({ label, icon, path }) => {
    const isActive = location.pathname === path;
    return <NavigationLink key={label} label={label} icon={icon} path={path} active={isActive} />;
  });

  return (
    <Box mt={smScreen ? 0 : 'xl'}>
      {links}
      {user && (
        <NavigationButton
          icon={<IconLogout />}
          label="Sign out"
          onClick={() => dispatch(userSignout())}
        />
      )}
    </Box>
  );
};

NavigationLink.defaultProps = {
  active: false,
};

NavigationLink.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

NavigationButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MainLinks;
