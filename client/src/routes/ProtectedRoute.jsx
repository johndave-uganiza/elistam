import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    // The state property stores the original location which the user tries to access through a named property.
    <Navigate to="/login" state={{ from: location }} />
  );

  
}

export default ProtectedRoute;
