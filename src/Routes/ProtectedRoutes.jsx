import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.user);

  if (!userToken) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
