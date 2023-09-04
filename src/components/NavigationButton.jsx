import { NavLink, useMantineTheme } from '@mantine/core';
import PropTypes from 'prop-types';

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

NavigationButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavigationButton;
