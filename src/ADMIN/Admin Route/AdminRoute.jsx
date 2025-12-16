// ADMIN/Admin Route/AdminRoute.jsx
import { Navigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Loading from "../../Pages/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = UseAuth();

  if (loading) return <Loading />;

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;