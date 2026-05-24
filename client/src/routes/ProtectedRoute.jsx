import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("auth");
  const location = useLocation();

  if (!isAuthenticated) {
    // The state property stores the original location which the user tries to access through a named property.
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
