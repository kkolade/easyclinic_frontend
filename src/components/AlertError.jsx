import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import PropTypes from 'prop-types';

const AlertError = ({ children, ...props }) => (
  <Alert icon={<IconAlertCircle size="1rem" />} color="red" variant="outline" {...props}>
    {children}
  </Alert>
);

AlertError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertError;
