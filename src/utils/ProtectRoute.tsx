import { useAuthContext } from '@/context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
function ProtectRoute() {
  const location = useLocation();
  const { user, isLoading } = useAuthContext();
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  }
}

export default ProtectRoute;
