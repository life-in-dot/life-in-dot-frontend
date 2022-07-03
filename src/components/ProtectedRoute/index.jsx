import { Navigate, Outlet } from "react-router-dom";

import PropTypes from "prop-types";

function ProtectedRoute({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
