import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const GuestRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // Redirect based on role
    if (user.role === "ADMIN") return <Navigate to="/admin/metrics" replace />;
    return <Navigate to="/profile" replace />; // normal user
  }

  // Guest can access
  return children;
};

export default GuestRoute;
