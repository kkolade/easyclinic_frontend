import { Anchor } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RouterLink = ({ to, children, ...rest }) => (
  <Anchor component={Link} to={to} {...rest}>
    {children}
  </Anchor>
);

RouterLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RouterLink;
