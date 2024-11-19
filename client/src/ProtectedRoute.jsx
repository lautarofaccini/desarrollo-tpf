import { Navigate, Outlet, useLocation  } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const LoadingScreen = () => <h1>Loading...</h1>;

export const AuthRequired = () => {
  const location = useLocation();

  const { loading, isAuthenticated } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }}  replace />;

  return <Outlet />;
};

export const AdminRequired = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated || !isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
};
