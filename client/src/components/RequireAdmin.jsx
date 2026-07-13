import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";

const RequireAdmin = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default RequireAdmin;