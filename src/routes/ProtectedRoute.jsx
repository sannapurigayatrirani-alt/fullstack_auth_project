import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../api/axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const valid = await validateToken();

      setIsAuthenticated(valid);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;