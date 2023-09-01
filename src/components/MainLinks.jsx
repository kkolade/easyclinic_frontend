import { Box, NavLink, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHome, IconLogin } from '@tabler/icons-react';
import PropTypes from 'prop-types';

const MainLink = ({ icon, label, active }) => {
  const theme = useMantineTheme();

  return (
    <NavLink
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
  { icon: <IconHome />, label: 'Home', active: true },
  { icon: <IconLogin />, label: 'Login' },
];

const MainLinks = () => {
  const smScreen = useMediaQuery('(max-width: 48em)');

  const links = data.map(({ label, icon, active }) => (
    <MainLink key={label} label={label} icon={icon} active={active} />
  ));
  return <Box mt={smScreen ? 0 : 'xl'}>{links}</Box>;
};

MainLink.defaultProps = {
  active: false,
};

MainLink.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default MainLinks;
