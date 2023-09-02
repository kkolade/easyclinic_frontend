import { Button } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RouterButton = ({ to, children, ...rest }) => (
  <Button component={Link} to={to} {...rest}>
    {children}
  </Button>
);

RouterButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RouterButton;
