import { PropTypes } from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectPath }) => {
  if (isAllowed) return <Outlet />;
  return <Navigate to={redirectPath} replace />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  redirectPath: '/',
};

export default ProtectedRoute;
