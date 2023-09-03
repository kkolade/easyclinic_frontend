import { NavLink, useMantineTheme } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

NavigationLink.defaultProps = {
  active: false,
};

NavigationLink.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default NavigationLink;
