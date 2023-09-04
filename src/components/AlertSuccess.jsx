import { Alert } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import PropTypes from 'prop-types';

const AlertSuccess = ({ children, ...props }) => (
  <Alert icon={<IconCircleCheck size="1rem" />} color="green" variant="outline" {...props}>
    {children}
  </Alert>
);

AlertSuccess.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertSuccess;
