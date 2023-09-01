import { Box, NavLink, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome, IconLogin } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const MainLink = ({
  icon, label, path, active,
}) => {
  const theme = useMantineTheme();

  return (
    <NavLink
      component={Link}
      to={path}
      label={label}
      icon={icon}
      variant="light"
      styles={{
        label: {
          fontSize: theme.fontSizes.lg,
          fontWeight: 700,
        },
      }}
      active={active}
    />
  );
};

const data = [
  { icon: <IconHome />, label: 'Home', path: '/' },
  { icon: <IconLogin />, label: 'Sign in', path: '/signin' },
];

const MainLinks = () => {
  const smScreen = useMediaQuery('(max-width: 48em)');
  const location = useLocation();

  const links = data.map(({ label, icon, path }) => {
    const isActive = location.pathname === path;
    return <MainLink key={label} label={label} icon={icon} path={path} active={isActive} />;
  });
  return <Box mt={smScreen ? 0 : 'xl'}>{links}</Box>;
};

MainLink.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default MainLinks;
