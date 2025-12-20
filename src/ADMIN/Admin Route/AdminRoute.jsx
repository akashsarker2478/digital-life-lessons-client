
import { Navigate, useLocation } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Loading from "../../Pages/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = UseAuth();
  const location = useLocation();

  
  if (loading) {
    return <Loading />;
  }

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (!isAdmin) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  
  return children;
};

export default AdminRoute;