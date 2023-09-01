import { Box, NavLink, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome, IconLogin } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MainLink = ({ icon, label, path }) => {
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
    />
  );
};

const data = [
  { icon: <IconHome />, label: 'Home', path: '/' },
  { icon: <IconLogin />, label: 'Sign in', path: '/signin' },
];

const MainLinks = () => {
  const smScreen = useMediaQuery('(max-width: 48em)');

  const links = data.map(({ label, icon, path }) => (
    <MainLink key={label} label={label} icon={icon} path={path} />
  ));
  return <Box mt={smScreen ? 0 : 'xl'}>{links}</Box>;
};

MainLink.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default MainLinks;
