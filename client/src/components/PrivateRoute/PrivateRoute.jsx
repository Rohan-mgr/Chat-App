import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
