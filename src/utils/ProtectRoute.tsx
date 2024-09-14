import { Navigate, Outlet, useLocation } from 'react-router-dom';
function ProtectRoute() {
  const location = useLocation();
  const isAuth = true;
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export default ProtectRoute;
